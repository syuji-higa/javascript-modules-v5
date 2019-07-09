/**
 * @param {Element} target
 * @param {string} eventType
 * @param {function} listener
 * @param {boolean|Object} [option]
 * @return {Object}
 */
export const createEvent = (target, eventType, listener, option = false) => {
  return {
    handleEvent: (e) => {
      listener(e)
    },
    add: function() {
      target.addEventListener(eventType, this, option)
    },
    remove: function() {
      target.removeEventListener(eventType, this, option)
    }
  }
}

/**
 * @param {Element} target
 * @param {string}eventType
 * @param {Evnt} event
 * @param {Object} detail
 *
 * @example
 *   onDispatchEvent.bind(this, window, 'resize', e);
 */
export const onDispatchEvent = (target, eventType, event, detail = {}) => {
  const _detail /* :Object */ = (() => {
    const _obj /* :Object */ = {
      status: event
    }
    if (detail) {
      Object.assign(_obj, detail)
    }
    return _obj
  })()

  target.dispatchEvent(
    new CustomEvent(eventType, {
      detail: _detail
    })
  )
}
