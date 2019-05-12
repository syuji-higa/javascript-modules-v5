/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'

class StoreObserve {
  _selfClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList|null */ = null
  _storeStateObject /* :Object */ = {}

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      selfClassName: 'js-store-observe'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = Object.assign(StoreObserve._defOptions, options)

    this._selfClassName = selfClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)

    this._storeStateObject = {
      windowWidth: () => {
        this.update()
      },
      windowHeight: () => {
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
    console.log(store.state.windowWidth, store.state.windowHieght)

    return this
  }
}

export { StoreObserve as default }
