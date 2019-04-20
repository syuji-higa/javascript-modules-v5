/**
 * depends on 'vanix' used in 'inviewportScrollObserver'
 */

import { inviewportScrollObserver, requestAnimationFramer } from '../modules'
import { parse } from '../models/query-string'
import { ratioValue } from '../models/ratio-value'
import { shownElement } from '../utils/element'
import { dataAttribute } from '../utils/attribute'

class ScrollAnimator {
  _selfClassName /* :string */ = ''
  _itemClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList */
  _state /* :WeakMap */ = new WeakMap()

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      selfClassName: 'js-scroll-animator',
      itemClassName: 'js-scroll-animator-item'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   * @param {string} [options.itemClassName]
   */
  constructor(options = {}) {
    const { selfClassName, itemClassName } = Object.assign(
      ScrollAnimator._defOptions,
      options
    )

    this._selfClassName = selfClassName
    this._itemClassName = itemClassName
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
        elements /* :Object */: shownElement(
          $el.getElementsByClassName(this._itemClassName)
        ),
        viewportRatio /* :number */: 0, // [0,1]
        valueRatio /* :number|null */: null, // [0,1]
        acceleration /* :number */: Number(
          $el.dataset.scrollAnimatorAcceleration
        ) // [0,inf)
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
    const _state /* :Object */ = this._state.get($el)
    const { elements, viewportRatio, valueRatio, acceleration } = _state

    if (valueRatio !== null) {
      _state.valueRatio += (viewportRatio - valueRatio) * acceleration
    } else {
      _state.valueRatio = viewportRatio
    }

    for (const $child of elements) {
      const _styles /* :Object */ = parse(
        dataAttribute($child, 'scrollAnimationData')
      )

      for (const [prop, values] of Object.entries(_styles)) {
        const _values /* :string[] */ = values.match(/'(.+)'\s*,\s*'(.+)'/)
        $child.style[prop] = ratioValue(
          _values[1],
          _values[2],
          _state.valueRatio
        )
      }
    }
  }
}

export { ScrollAnimator as default }
