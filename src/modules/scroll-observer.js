/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { eventer } from '../modules'
import { throttle } from '../utils/throttle'

class ScrollObserver {
  _scrollThrottle /* :function */
  _scrollEvent /* :Object */ = {}

  constructor() {
    this._scrollThrottle = throttle(200)
    this._scrollEvent = eventer.create(
      window,
      'scroll',
      this._onScroll.bind(this)
    )
  }

  /**
   * @return {Instance}
   */
  on() {
    this._scrollEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._scrollEvent.remove()
    return this
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
