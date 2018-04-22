# judgeInteract
judge if spcified types of event is programmatic trigger or user interact

# import

    npm install --save @hudk/judge-interactive

# usage

    require('@hudk/judge-interactive')

## functions

    addInteractiveEventListener(type, listener[, useCapture, options])
    
    listener: {
      userTriggerListener: Function,
      progTriggerListener: Function
    }
    [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

    removeInteractiveEventListener(type, listener[, useCapture, options])

    listener: {
      userTriggerListener: Function,
      progTriggerListener: Function
    }
    [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)