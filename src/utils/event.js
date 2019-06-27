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
 * @param {Array} options
 * @param {Element} options[0] - dispatc target
 * @param {string} options[1] - eventType
 * @param {Object} [options[2]] - event detail
 * @param {Event} event
 *
 * @example
 *   onDispatchEvent.bind(this, [window, 'resize'], e);
 */
export const onDispatchEvent = (options, event) => {
  const [target, eventType, detail] = options

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
