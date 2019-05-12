import { parse } from '../models/query-string'
import { splitElement } from '../utils/split-element'

class CharSplitter {
  _$$el /* :HTMLCollection|NodeList|null */ = null
  _selfClassName /* :string */ = ''
  _isSplitedClassName /* :string */ = ''

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      selfClassName: 'js-char-splitter',
      isSplitedClassName: 'is-char-splited'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   * @param {string} [options.isSplitedClassName]
   */
  constructor(options = {}) {
    const { selfClassName, isSplitedClassName } = Object.assign(
      CharSplitter._defOptions,
      options
    )

    this._selfClassName = selfClassName
    this._isSplitedClassName = isSplitedClassName
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
  split() {
    for (const $el of Array.from(this._$$el)) {
      if (!$el.classList.contains(this._isSplitedClassName)) {
        this._split($el)
        $el.classList.add(this._isSplitedClassName)
      }
    }
    return this
  }

  /**
   * @param {Element} $el
   */
  _split($el) {
    const { charType, charClass, charAttributes } = $el.dataset
    const _$df /* :DocumentFragment */ = splitElement($el.innerHTML, {
      type: charType || 'character',
      className: charClass || '',
      attributes: parse(charAttributes)
    })
    $el.innerHTML = ''
    $el.appendChild(_$df)
  }
}

export { CharSplitter as default }
