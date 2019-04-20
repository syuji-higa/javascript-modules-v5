/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { parse } from '../models/query-string'
import { inviewportObserver, scrollObserver } from '../modules'
import { rect } from '../utils/rect'

class InviewportScrollObserver {
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
    const _options = $el.dataset.inviewportScrollObserverOptions

    const { windowTopStart, windowBottomEnd, startOffset, endOffset } = parse(
      _options
    )

    this._targets.set($el, {
      updateFunc,
      windowTopStart /* :boolean */: windowTopStart || false,
      windowBottomEnd /* :boolean */: windowBottomEnd || false,
      startOffset /* :number*/: startOffset || 0,
      endOffset /* :number */: endOffset || 0,
      state /* :Object */: {
        range /* :number - [0,inf) */: 0,
        start /* :number*/: 0
      }
    })
    this._setState($el)
    inviewportObserver.add($el, (isInviewport) => {
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
    this._inviewportTargets.forEach(($el) => {
      this._setState($el)
    })
  }

  /**
   * @param {Element} $el
   */
  _setState($el) {
    const { top, height } = rect($el)
    const {
      windowTopStart,
      windowBottomEnd,
      startOffset,
      endOffset,
      state
    } = this._targets.get($el)
    state.range = windowBottomEnd ? height : height + store.state.windowHeight
    state.start = windowTopStart ? top : top - store.state.windowHeight
    state.range += endOffset
    state.start += startOffset
  }

  _updateAll() {
    this._inviewportTargets.forEach(($el) => {
      this._update($el)
    })
  }

  _update($el) {
    const { updateFunc, state } = this._targets.get($el)
    const { range, start } = state
    const _progress /* :number - [0,inf) */ = store.state.windowOffsetY - start
    const _progressRatio /* :number - [0,1] */ = _progress / range
    updateFunc({
      target: $el,
      progress: _progress,
      progressRatio: _progressRatio
    })
  }
}

export { InviewportScrollObserver as default }
