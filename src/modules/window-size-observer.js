/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { eventer } from '../modules'
import { debounce } from '../utils/debounce'

class WindowSizeObserver {
  _isMobile /* :boolane */ = false
  _resizeDebounce /* :function */
  _resizeEvent /* :Object */ = {}

  constructor() {
    this._isMobile = !!store.state.platform.type.match(/^mobile$/)

    this._resizeDebounce = debounce(200)
    this._resizeEvent = eventer.create(
      window,
      'resize',
      this._onResize.bind(this)
    )
  }

  /**
   * @return {Instance}
   */
  on() {
    this._resizeEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._resizeEvent.remove()
    return this
  }

  /**
   * @return {Instance}
   */
  update() {
    if (!this._isMobile || store.state.windowWidth !== window.innerWidth) {
      store.commit('setWindowWidthLastChangedHeight', window.innerHeight)
    }
    if (store.state.windowWidth !== window.innerWidth) {
      store.commit('setWindowWidth', window.innerWidth)
    }
    if (store.state.windowHeight !== window.innerHeight) {
      store.commit('setWindowHeight', window.innerHeight)
    }

    if (store.state.breakPoint[0] > store.state.windowWidth) {
      if (store.state.windowSizeType !== 'mobile') {
        store.commit('setWindowSizeType', 'mobile')
      }
    } else if (store.state.breakPoint[1] > store.state.windowWidth) {
      if (store.state.windowSizeType !== 'tablet') {
        store.commit('setWindowSizeType', 'tablet')
      }
    } else {
      if (store.state.windowSizeType !== 'desktop') {
        store.commit('setWindowSizeType', 'desktop')
      }
    }

    return this
  }

  _onResize() {
    this._resizeDebounce(this.update.bind(this))
  }
}

export { WindowSizeObserver as default }
