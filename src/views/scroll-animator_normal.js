/**
 * depends on 'vanix' used in 'inviewportScrollObserver'
 */

import { inviewportScrollObserver, requestAnimationFramer } from '../modules'
import { ratioValue } from '../models/ratio-value'
import { groupByDataElement } from '../utils/element'
import { scrollAnimationData } from '../data/scroll-animation-data'

class ScrollAnimator {
  _selfClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList|null */ = null
  _state /* :WeakMap */ = new WeakMap()

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-scroll-animator'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = { ...ScrollAnimator._defaultOptions, ...options }

    this._selfClassName = selfClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$$el = null
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    for (const $el of Array.from(this._$$el)) {
      inviewportScrollObserver.add(
        $el,
        this._update.bind(this),
        this._once.bind(this, $el)
      )
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    for (const $el of Array.from(this._$$el)) {
      inviewportScrollObserver.remove($el)
    }
    return this
  }

  /**
   * @param {Element} $el
   * @param {boolean} isInviewport
   */
  _once($el, isInviewport) {
    if (isInviewport) {
      this._state.set($el, {
        elements /* :Object */: groupByDataElement(
          $el,
          'scroll-animation-child-name'
        ),
        viewportRatio /* :number - [0,1] */: 0,
        valueRatio /* :number|null - [0,1] */: null
      })
      requestAnimationFramer.add($el, this._animate.bind(this))
    } else {
      this._state.delete($el)
      requestAnimationFramer.remove($el, this._animate.bind(this))
    }
  }

  /**
   * @param {Object} obj
   * @property {Element} obj.target
   * @property {number} obj.progressRatio - [0,1]
   */
  _update({ target, progressRatio }) {
    const _state /* :Object */ = this._state.get(target)
    _state.viewportRatio = progressRatio
  }

  _animate($el) {
    const _animationName /* :string */ = $el.dataset.scrollAnimatorName
    const _data /* :Object */ = scrollAnimationData[_animationName]

    const _state /* :Object */ = this._state.get($el)
    const { elements, viewportRatio, valueRatio } = _state

    for (const [name, { styles, acceleration }] of Object.entries(_data)) {
      if (valueRatio !== null) {
        _state.valueRatio += (viewportRatio - valueRatio) * acceleration
      } else {
        _state.valueRatio = viewportRatio
      }

      for (const [prop, values] of Object.entries(styles)) {
        for (const $child of Array.from(elements[name])) {
          $child.style[prop] = ratioValue(...values, _state.valueRatio)
        }
      }
    }
  }
}

export { ScrollAnimator as default }
