# judgeInteract
judge if spcified types of event is programmatic trigger or user interact

# import

    npm install --save @hudk/judge-interactive

# usage

    require('@hudk/judge-interactive')

## functions

    1. addInteractiveEventListener(type, listener[, useCapture, options], wantsUntrusted)
      listener: {
        userTriggerListener: Function, // called when user trigger
        progTriggerListener: Function  // called when programmatically trigger
      }
other params same as [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

    2. removeInteractiveEventListener(type, listener[, useCapture, options])
      // listener is the same listener used in addInteractiveEventListener, not userTriggerListener or progTriggerListener
other params same as [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)