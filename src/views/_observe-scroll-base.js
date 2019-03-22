/**
 * depends on 'vanix' used in '../store'
 */

import { store } from '../store'
import { inviewportObserver } from '../modules'
import { rect } from '../utils/rect'

class ObserveScrollBase {
  _selfClassName /* :string */ = ''
  _$el /* :Element */
  _$$item /* :HTMLCollection|NodeList */
  _storeStateObject /* :Object */ = {}
  _status /* :Object */ = {
    offsetY /* :number float */: 0
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
      ObserveScrollBase._defOptions,
      options
    )

    this._selfClassName = selfClassName

    this._storeStateObject = {
      windowWidth: () => {
        this._setOffsetY()
      },
      windowHeight: () => {
        this._setOffsetY()
      },
      windowOffsetY: (state) => {
        console.log(state.windowOffsetY)
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
  }

  _off() {
    store.unobserve(this._storeStateObject)
  }

  _setOffsetY() {
    this._status.offsetY = rect(this._$el).top
    console.log(this._status.offsetY)
  }
}

export { ObserveScrollBase as default }
