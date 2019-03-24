/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { inviewportObserver, scrollObserver } from '../modules'
import { rect } from '../utils/rect'

class inviewportScrollObserver {
  _targets /* :WeakMap */ = new WeakMap()
  _inviewportTargets /* :Set */ = new Set()
  _storeStateObject /* :Object */ = {}

  constructor() {
    this._storeStateObject = {
      windowWidth: () => {
        this._setStateAll()
      },
      windowHeight: () => {
        this._setStateAll()
      },
      windowOffsetY: () => {
        this._updateAll()
      }
    }
  }

  /**
   * @return {Instance}
   */
  on() {
    store.observe(this._storeStateObject)
    this._setStateAll()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    store.unobserve(this._storeStateObject)
    return this
  }

  /**
   * @param {Element} $el
   * @param {function} updateFunc
   * @param {?function} onceFunc
   * @return {Instance}
   */
  add($el, updateFunc, onceFunc = null) {
    this._targets.set($el, {
      updateFunc,
      state /* :Object */: {
        range /* :number [0,inf) */: 0,
        start /* :number */: 0
      }
    })
    this._setState($el)
    inviewportObserver.add($el, (isInviewport /* :boolean */) => {
      if (onceFunc) {
        onceFunc(isInviewport)
      }
      if (isInviewport) {
        this._inviewportTargets.add($el)
        scrollObserver.add($el)
        this._update($el)
      } else {
        this._inviewportTargets.delete($el)
        scrollObserver.remove($el)
      }
    })
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._inviewportTargets.delete($el)
    this._targets.delete($el)
    scrollObserver.remove($el)
    inviewportObserver.remove($el)
    return this
  }

  _setStateAll() {
    this._inviewportTargets.forEach(($el /* :Element */) => {
      this._setState($el)
    })
  }

  /**
   * @param {Element} $el
   */
  _setState($el) {
    const { top /* :number */, height /* :number */ } = rect($el)
    const { state /* :Object */ } = this._targets.get($el)
    state.range = height + store.state.windowHeight
    state.start = top - store.state.windowHeight
  }

  _updateAll() {
    this._inviewportTargets.forEach(($el /* :Element */) => {
      this._update($el)
    })
  }

  _update($el) {
    const {
      updateFunc /* :function */,
      state /* :Object */
    } = this._targets.get($el)
    const { range /* :number */, start /* :number */ } = state
    const _progress /* :number [0,inf) */ = store.state.windowOffsetY - start
    const _progressRatio /* :number [0,1] */ = _progress / range
    updateFunc({
      target: $el,
      progress: _progress,
      progressRatio: _progressRatio
    })
  }
}

export { inviewportScrollObserver as default }
