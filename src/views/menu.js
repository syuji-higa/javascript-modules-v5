/**
 * depends on 'vanix' used in 'store'
 */

import lottie from 'lottie-web'
import animationData from '../data/lottie/menu-button.json'
import { createEvent } from '../utils/event'

class Menu {
  _menuClassName /* :string */ = ''
  _icoClassName /* :string */ = ''
  _isOpenedClassName /* :string */ = {}
  _clickEvent /* :Object|null */ = {}
  _lottie /* :Instance|null */ = null

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      menuClassName: 'js-menu',
      icoClassName: 'js-menu-ico',
      isOpenedClassName: 'is-menu-opened',
      chapter: {
        default: 0,
        openTo: 16,
        closeTo: 32
      }
    }
  }

  /**
   * @param {Object}
   * @property {Object} [options]
   * @property {string} [options.menuClassName]
   * @property {string} [options.icoClassName]
   * @property {string} [options.isOpenedClassName]
   * @property {number[]} [options.chapter] - int[0,inf)
   */
  constructor(options = {}) {
    const { menuClassName, icoClassName, isOpenedClassName, chapter } = {
      ...Menu._defaultOptions,
      ...options
    }

    this._menuClassName = menuClassName
    this._icoClassName = icoClassName
    this._isOpenedClassName = isOpenedClassName
    this._chapter = chapter
  }

  /**
   * @return {Instance}
   */
  create() {
    const _$menu /* :Element */ = document.getElementsByClassName(
      this._menuClassName
    )[0]
    const _$ico /* :Element */ = document.getElementsByClassName(
      this._icoClassName
    )[0]

    this._clickEvent = createEvent(_$menu, 'click', this.toggle.bind(this))

    this._lottie = lottie.loadAnimation({
      container: _$ico,
      renderer: 'svg',
      animationData: animationData
    })

    this._lottie.goToAndStop(this._chapter.closeTo, true)

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._clickEvent = {}
    this._lottie = null

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
   * @return {Instance}
   */
  toggle() {
    if (document.documentElement.classList.contains(this._isOpenedClassName)) {
      this.close()
    } else {
      this.open()
    }
    return this
  }

  /**
   * @return {Instance}
   */
  open() {
    document.documentElement.classList.add(this._isOpenedClassName)
    this._lottie.playSegments(
      [this._chapter.default, this._chapter.openTo],
      false
    )
    return this
  }

  /**
   * @return {Instance}
   */
  close() {
    document.documentElement.classList.remove(this._isOpenedClassName)
    this._lottie.playSegments(
      [this._chapter.openTo, this._chapter.closeTo],
      false
    )
    return this
  }
}

export { Menu as default }
