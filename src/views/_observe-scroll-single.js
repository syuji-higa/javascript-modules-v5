/**
 * depends on 'vanix' used in 'inviewportScrollObserver'
 */

import { inviewportScrollObserver } from '../modules'

class ObserveScrollSingle {
  _selfClassName /* :string */ = ''
  _$el /* :Element|null */ = null

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
    inviewportScrollObserver.add(this._$el, this._update.bind(this))
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    inviewportScrollObserver.remove(this._$el)
    return this
  }

  /**
   * @param {Object} obj
   * @property {Element} obj.target
   * @property {number} obj.progress - [0,inf)
   * @property {number} obj.progressRatio - [0,1]
   */
  _update({ target, progress, progressRatio }) {
    console.log(target, progress, progressRatio)
  }
}

export { ObserveScrollSingle as default }
