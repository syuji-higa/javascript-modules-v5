import { eventer } from '../modules'
import SwipeStatus from './swipe-status'

class TouchEventObserver {
  _swipeStatus /* :?Instance */
  _$el /* :?Element */
  _touchEvents /* :Object */ = {}
  _mouseEvents /* :Object */ = {}
  _reaction /* :number - int[0,inf) */ = 0
  _needsTouch /* :boolean */ = true
  _needsMouse /* :boolean */ = false
  _eventOption /* :boolean */ = false

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      reaction: 0,
      needsTouch: true,
      needsMouse: false,
      eventOption: false
    }
  }

  /**
   *
   * @param {Element} $el
   * @param {Object} [options]
   * @param {number} [options.reaction] - int[0,inf)
   * @param {boolean} [options.needsTouch]
   * @param {boolean} [options.needsMouse]
   * @param {boolean|Object} [options.eventOption] - eventListener option
   */
  constructor($el, options) {
    const { reaction, needsTouch, needsMouse, eventOption } = {
      ...TouchEventObserver._defaultOptions,
      ...options
    }

    this._$el = $el
    this._reaction = reaction
    this._needsTouch = needsTouch
    this._needsMouse = needsMouse
    this._eventOption = eventOption
  }

  /**
   * @return {Instance}
   */
  create() {
    this._swipeStatus = new SwipeStatus({
      reaction: this._reaction
    })

    if (this._needsTouch) {
      this._touchEvents = {
        touchstart: eventer.create(
          $el,
          'touchstart',
          this._onTouchstart.bind(this),
          this._eventOption
        ),
        touchmove: eventer.create(
          $el,
          'touchmove',
          this._onTouchmove.bind(this),
          this._eventOption
        ),
        touchend: eventer.create(
          $el,
          'touchend',
          this._onTouchend.bind(this),
          this._eventOption
        )
      }
    }

    if (this._needsMouse) {
      this._mouseEvents = {
        mousedown: eventer.create(
          $el,
          'mousedown',
          this._onTouchstart.bind(this),
          this._eventOption
        ),
        mousemove: eventer.create(
          $el,
          'mousemove',
          this._onTouchmove.bind(this),
          this._eventOption
        ),
        mouseup: eventer.create(
          $el,
          'mouseup',
          this._onTouchend.bind(this),
          this._eventOption
        )
      }
    }

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._swipeStatus = {}
    this._touchEvents = {}
    this._mouseEvents = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    for (const event of Object.values(this._touchEvents)) {
      event.add()
    }
    for (const event of Object.values(this._mouseEvents)) {
      event.add()
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    for (const event of Object.values(this._touchEvents)) {
      event.remove()
    }
    for (const event of Object.values(this._mouseEvents)) {
      event.remove()
    }
    return this
  }

  /**
   * @param {Event} e
   */
  _onTouchstart(e) {
    if (this._swipeStatus.isTouching) return

    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e
    this._swipeStatus.start(pageX, pageY)
  }

  /**
   * @param {Event} e
   */
  _onTouchmove(e) {
    if (!this._swipeStatus.isTouching) return

    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e
    this._swipeStatus.move(pageX, pageY)

    const { axis, delta } = this._swipeStatus
    if (axis) {
      this._$el.dispatchEvent(
        new CustomEvent(`panmove${axis.toUpperCase()}`, {
          detail: {
            status: e,
            delta,
            sign: -Math.sign(delta)
          }
        })
      )
    }
  }

  /**
   * @param {Event} e
   */
  _onTouchend(e) {
    const { axis, delta } = this._swipeStatus
    this._$el.dispatchEvent(
      new CustomEvent(`pan${axis.toUpperCase()}`, {
        detail: {
          status: e,
          axis,
          delta,
          sign: -Math.sign(delta)
        }
      })
    )

    this._swipeStatus.end()
  }
}

export { TouchEventObserver as default }
