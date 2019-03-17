/**
 * depends on 'vanix' used in '../store'
 */

import { store } from '../store'

class HeightFitter {
  _$$el /* :HTMLCollection|NodeList */
  _platformType /* :string */ = ''
  _storeStateObject /* :Object */ = {}

  /**
   * @return {Object}
   */
  static get _defOpts() {
    return {
      selfClassName: 'js-height-fitter'
    }
  }

  /**
   * @param {Object} [opts]
   * @param {string} [opts.selfClassName]
   */
  constructor(opts = {}) {
    const { selfClassName } = Object.assign(HeightFitter._defOpts, opts)

    this._$$el = document.getElementsByClassName(selfClassName)

    this._platformType = store.state.platform.type

    this._storeStateObject = {
      setWindowWidthLastChangedHeight: () => {
        this.update()
      }
    }
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
    const _height /* :number int[0,inf) */ =
      store.state.windowWidthLastChangedHeight

    for (const $el /* :Element */ of Array.from(this._$$el)) {
      if (this._platformType === $el.dataset.heightFitterIgnore) {
        continue
      }
      $el.style.height = `${_height}px`
    }

    return this
  }
}

export { HeightFitter as default }
