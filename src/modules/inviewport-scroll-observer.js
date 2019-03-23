/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { inviewportObserver } from '../modules'
import { rect } from '../utils/rect'

class inviewportScrollObserver {
  _targets /* :WeakMap */ = new WeakMap()
  _inviewportTargets /* :Map */ = new Map()
  _storeStateObject /* :Object */ = {}

  constructor() {
    this._storeStateObject = {
      windowWidth: () => {
        this._setStateAll()
      },
      windowHeight: () => {
        this._setStateAll()
      },
      windowOffsetY: (state) => {
        this._update(state.windowOffsetY)
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
   * @param {function} func
   * @return {Instance}
   */
  add($el, func) {
    this._targets.set($el, {
      func,
      state /* :Object */: {
        range /* :number [0,inf) */: 0,
        start /* :number */: 0
      }
    })
    this._setState($el)
    inviewportObserver.add($el, (isInviewport /* :boolean */) => {
      if (isInviewport) {
        this._inviewportTargets.set($el, this._targets.get($el))
      } else {
        this._inviewportTargets.delete($el, this._targets.get($el))
      }
    })
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._inviewportTargets.delete($el, this._targets.get($el))
    this._targets.delete($el)
    inviewportObserver.remove($el)
    return this
  }

  _setStateAll() {
    this._inviewportTargets.forEach((
      target /* :Object */,
      $el /* :Element */
    ) => {
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

  _update(offsetY) {
    this._inviewportTargets.forEach((
      { func /* :function */, state /* :Object */ },
      $el /* :Element */
    ) => {
      const { range /* :number */, start } = state
      const _progress /* :number [0,inf) */ = offsetY - start
      const _progressRatio /* :number [0,1] */ = _progress / range
      func({
        taregt: $el,
        progress: _progress,
        progressRatio: _progressRatio
      })
    })
  }
}

export { inviewportScrollObserver as default }
