// { isUserTrigger, options }
let listeners = [];

/**
 * get index of param0 from listener, if has not, return -1
 * once不影响比较，listener, options.capture(或usecapture), options.passive 任一不等则不是同一种事件
 * @param {obj} param0 event params
 */
function getEventIndexFromListener({ type, listener, options }) {
  if (!listeners[type]) {
    return -1;
  }

  const isCapture = options =>
    (typeof options === 'object' ? options.capture : options)
      ? true
      : false;

  const isPassive = options =>
    // 要全等，所以返回不能是undefined
    typeof options === 'object' && options.passive ? true : false;

  let outer = {
    isCapture: isCapture(options),
    isPassive: isPassive(options)
  };

  return listeners[type].findIndex(l => {
    if (listener !== l.options.listener) {
      return false;
    }

    let o = l.options.options;
    return (
      outer.isCapture === isCapture(o) && outer.isPassive === isPassive(o)
    );
  });
}

function judgeOptions(...rest) {
  return getEventIndexFromListener.apply(null, rest) !== -1;
}

EventTarget.prototype.addInteractiveEventListener = function(
  type,
  listener,
  options,
  wantsUntrusted
) {
  // 判断有无注册过事件，如果注册过就不注册了
  if (listeners[type] && judgeOptions({
      type,
      listener,
      options,
      wantsUntrusted
    })) {
    return;
  }

  let obj = {
    isUserTrigger: false,
    options: { type, listener, options, wantsUntrusted },
    once: typeof options === 'object' && options.once
  };

  // decorater
  obj.listener = event => {
    obj.isUserTrigger
      ? listener.userTriggerListener &&
        listener.userTriggerListener.call(this, event)
      : listener.progTriggerListener &&
        listener.progTriggerListener.call(this, event);

    obj.once ? this.removeInteractiveEventListener(obj.options) : '';
  };

  // 在事件流最开始的时候定义，如果捕获被microtask插入，说明是手动操作
  window.addEventListener(
    type,
    _ => {
      obj.isUserTrigger = false;
      Promise.resolve().then(_ => {
        obj.isUserTrigger = true;
      });
    },
    true
  );

  listeners[type] = listeners[type] || [];
  listeners[type].push(obj);

  this.addEventListener(type, obj.listener, options, wantsUntrusted);
};

EventTarget.prototype.removeInteractiveEventListener = function(
  type,
  listener,
  options
) {
  if (!listeners[type]) {
    return;
  }
  let index = getEventIndexFromListener({
    type,
    listener,
    options
  });
  if (index === -1) {
    return;
  }

  let obj = listeners[type][index];
  listeners[type].splice(index, 1);

  this.removeEventListener(type, obj.listener, options);
};
