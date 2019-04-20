import { createEvent } from '../utils/event'

class Eventer {
  _events /* Object[] */ = []

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function} listener
   * @param {boolean|Object} [option]
   * @return {Object}
   * @property {functon} add
   * @property {functon} remove
   */
  create(target, eventType, listener, option = false) {
    return {
      add: () => {
        this.add(target, eventType, listener, option)
      },
      remove: () => {
        this.remove(target, eventType, listener)
      }
    }
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function} listener
   * @param {boolean|Object} [option]
   * @return {Instance}
   */
  add(target, eventType, listener, option = false) {
    let _hasEvent /* :boolean */ = false

    for (const e of this._events) {
      if (
        target === e.target &&
        eventType === e.eventType &&
        option === e.option &&
        !e.listeners.includes(listener)
      ) {
        e.listeners.push(listener)
        _hasEvent = true
        return
      }
    }

    if (!_hasEvent) {
      const _listeners /* :function[] */ = [listener]
      this._events.push({
        target,
        eventType,
        option,
        listeners: _listeners,
        event: this._addEvent(target, eventType, _listeners, option)
      })
    }

    return this
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function} listener
   * @return {Instance}
   */
  remove(target, eventType, listener) {
    this._events.forEach((e, i) => {
      if (
        target === e.target &&
        eventType === e.eventType &&
        e.listeners.includes(listener)
      ) {
        e.listeners.splice(e.listeners.indexOf(listener), 1)
        if (!e.listeners.length) {
          this._removeEvent(i)
        }
        return
      }
    })

    return this
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function[]} listeners
   * @param {boolean|Object} option
   * @return {Object}
   * @property {function} add
   * @property {function} remove
   */
  _addEvent(target, eventType, listeners, option) {
    const _event = createEvent(
      target,
      eventType,
      (e) => {
        for (const listener of listeners) {
          listener(e)
        }
      },
      option
    )
    _event.add()
    return _event
  }

  /**
   * @param {number} index - int
   */
  _removeEvent(index) {
    this._events.splice(index, 1)
  }
}

export { Eventer as default }
