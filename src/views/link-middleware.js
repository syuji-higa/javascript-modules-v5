/**
 * depends on 'vanix' used in 'anchor'
 */

import { includesElement } from '../utils/element'
import { eventer, anchor } from '../modules'

class LinkMiddleware {
  _clickEvent /* :Object */ = {}

  constructor() {}

  /**
   * @return {Instance}
   */
  create() {
    this._clickEvent = eventer.create(
      document,
      'click',
      this._onClick.bind(this)
    )
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._clickEvent = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    this._clickEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._clickEvent.remove()
    return this
  }

  /**
   * @param {Event} e
   */
  _onClick(e) {
    const _$el /* :Element */ = includesElement(e.target, 'a')

    if (!_$el) {
      return
    }

    const _href /* :sgring */ = _$el.getAttribute('href')
    const _hashStrings /* :string[] */ = _href.match(/^#(.*)$/)
    const _hash /* :string */ = _hashStrings[1]

    const _$target /* :Element */ =
      _hash === '' ? document.body : document.getElementById(_hash)

    if (!_$target) {
      return
    }

    e.preventDefault()

    anchor.scroll(_$target)
  }
}

export { LinkMiddleware as default }
