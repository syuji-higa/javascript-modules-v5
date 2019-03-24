/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { eventer } from '../modules'
import { throttle } from '../utils/throttle'

class ScrollObserver {
  _scrollThrottle /* :function */
  _scrollEvent /* :Object */ = {}
  _targets /* :Set */ = new Set()

  constructor() {
    this._scrollThrottle = throttle(200)
    this._scrollEvent = eventer.create(
      window,
      'scroll',
      this._onScroll.bind(this)
    )
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  add($el) {
    this._targets.add($el)
    if (this._targets.size === 1) {
      this._on()
      this.update()
    }
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._targets.delete($el)
    if (this._targets.size === 0) {
      this._off()
    }
    return this
  }

  _on() {
    this._scrollEvent.add()
  }

  _off() {
    this._scrollEvent.remove()
  }

  /**
   * @return {Instance}
   */
  update() {
    store.commit('setWindowOffsetX', window.pageXOffset)
    store.commit('setWindowOffsetY', window.pageYOffset)
    return this
  }

  _onScroll() {
    this._scrollThrottle(this.update.bind(this))
  }
}

export { ScrollObserver as default }
