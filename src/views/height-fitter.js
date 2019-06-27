/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'

class HeightFitter {
  _selfClassName /* :string */ = ''
  _platformType /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList|null */ = null
  _storeStateObject /* :Object */ = {}

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-height-fitter'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = { ...HeightFitter._defaultOptions, ...options }

    this._selfClassName = selfClassName
    this._platformType = store.state.platform.type
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)

    this._storeStateObject = {
      windowWidthLastChangedHeight: () => {
        this.update()
      }
    }

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$$el = null
    this._storeStateObject = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    store.observe(this._storeStateObject)
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
   * @return {Instance}
   */
  update() {
    const _height /* :number - int[0,inf) */ =
      document.documentElement.clientHeight

    for (const $el of Array.from(this._$$el)) {
      if (this._platformType === $el.dataset.heightFitterIgnore) {
        continue
      }
      $el.style.height = `${_height}px`
    }

    return this
  }
}

export { HeightFitter as default }
