/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'
import { inviewportObserver } from '../modules'
import { rect } from '../utils/rect'

class ObserveScrollSingle {
  _selfClassName /* :string */ = ''
  _$el /* :Element */
  _$$item /* :HTMLCollection|NodeList */
  _storeStateObject /* :Object */ = {}
  _state /* :Object */ = {
    range /* :number [0,inf) */: 0,
    start /* :number */: 0
  }

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      selfClassName: 'js-class-name'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = Object.assign(
      ObserveScrollSingle._defOptions,
      options
    )

    this._selfClassName = selfClassName

    this._storeStateObject = {
      windowWidth: () => {
        this._setStatus()
      },
      windowHeight: () => {
        this._setStatus()
      },
      windowOffsetY: (state) => {
        this._update(state.windowOffsetY)
      }
    }
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$el = document.getElementsByClassName(this._selfClassName)[0]
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$el = null
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    inviewportObserver.add(this._$el, (isInviewport /* :boolean */) => {
      if (isInviewport) {
        this._on()
      } else {
        this._off()
      }
    })
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._off()
    inviewportObserver.remove(this._$el)
    return this
  }

  _on() {
    store.observe(this._storeStateObject)
    this._setStatus()
  }

  _off() {
    store.unobserve(this._storeStateObject)
  }

  _setStatus() {
    const { top /* :number */, height /* :number */ } = rect(this._$el)
    this._state.range = height + store.state.windowHeight
    this._state.start = top - store.state.windowHeight
  }

  _update(offsetY) {
    const { range, start } = this._state
    const _progress /* :number [0,inf) */ = offsetY - start
    const _progressRatio /* :number [0,1] */ = _progress / range
    console.log(_progressRatio)
  }
}

export { ObserveScrollSingle as default }
