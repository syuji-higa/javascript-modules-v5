import { eventer } from '../modules'
import TouchEventObserver from '../utils/touch-event-observer'
import { discontinuity } from '../utils/discontinuity'

class OnescrollObserver {
  _touchEventObserver /* :?Instance */
  _wheelEventDiscontinuity /* :?function */
  _wheelEvent /* :Object */ = {}
  _panYEvent /* :Object */ = {}
  _keyupEvent /* :Object */ = {}

  /**
   * @return {Instance}
   */
  create() {
    this._touchEventObserver = new TouchEventObserver(window)

    this._wheelEventDiscontinuity = discontinuity()

    this._wheelEvent = eventer.create(window, 'wheel', this._onWheel.bind(this))
    this._panYEvent = eventer.create(window, 'panY', this._onPan.bind(this))
    this._keyupEvent = eventer.create(
      document,
      'keyup',
      this._onKeyup.bind(this)
    )

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._touchEventObserver = null
    this._wheelEventDiscontinuity = null
    this._wheelEvent = {}
    this._panYEvent = {}
    this._keyupEvent = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    this._wheelEvent.add()
    this._panYEvent.add()
    this._keyupEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._wheelEvent.remove()
    this._panYEvent.remove()
    this._keyupEvent.remove()
    return this
  }

  /**
   * @param {Event} e
   */
  _onWheel(e) {
    this._wheelEventDiscontinuity(this._wheeled.bind(this, e))
  }

  /**
   * @param {Event} e
   */
  _wheeled(e) {
    const { deltaY } = e
    const _dirction = 0 > deltaY ? 'prev' : 0 < deltaY ? 'next' : null
    this._dispatch(_dirction)
  }

  /**
   * @param {Event} e
   */
  _onPan(e) {
    this._paned(e)
  }

  /**
   * @param {Event} e
   */
  _paned(e) {
    const { sign } = e.detail
    const _dirction = 0 > sign ? 'prev' : 0 < sign ? 'next' : null
    this._dispatch(_dirction)
    if (_dirction) {
      e.detail.status.preventDefault()
    }
  }

  /**
   * @param {Event} e
   */
  _onKeyup(e) {
    const _dirction = (() => {
      switch (e.which) {
        // up key
        case 38: {
          return 'prev'
        }
        // down key
        case 40: {
          return 'next'
        }
        // space key
        case 32: {
          return 'next'
        }
        default:
          return null
      }
    })()
    this._dispatch(_dirction)
  }

  /**
   * @param {?string} dirction - 'prev'|'next'
   */
  _dispatch(dirction) {
    if (!dirction) return
    document.dispatchEvent(
      new CustomEvent('onescroll', {
        detail: { dirction }
      })
    )
  }
}

export { OnescrollObserver as default }
