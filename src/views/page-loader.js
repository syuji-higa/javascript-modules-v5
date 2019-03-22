/**
 * depends on 'vanix' used in '../store'
 */

import { imagePreloader } from '../modules'

class PageLoader {
  _isWindowLoaded /* :boolean */ = false
  _isImagesPreloaded /* :boolean */ = false
  _isPageLoadedClassName /* :string */ = ''

  static get _defOptions() {
    return {
      isPageLoadedClassName: 'is-page-loaded'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.isPageLoadedClassName]
   */
  constructor(options = {}) {
    const { isPageLoadedClassName } = Object.assign(
      PageLoader._defOptions,
      options
    )

    this._isPageLoadedClassName = isPageLoadedClassName

    window.addEventListener('load', this._onWindowLoad.bind(this), {
      once: true
    })
  }

  /**
   * @return {Instance}
   */
  start() {
    this._preloadImages()
    return this
  }

  _onWindowLoad() {
    this._isWindowLoaded = true
    this._mightAllLoaded()
  }

  /**
   * @return {Promise}
   */
  async _preloadImages() {
    await imagePreloader.add(document.body)
    await imagePreloader.load(document.body)
    imagePreloader.remove(document.body)
    this._isImagesPreloaded = true
    this._mightAllLoaded()
  }

  _mightAllLoaded() {
    const _isAllLoaded /* :boolean */ =
      this._isWindowLoaded && this._isImagesPreloaded
    if (!_isAllLoaded) {
      return
    }
    document.documentElement.classList.add(this._isPageLoadedClassName)
    document.dispatchEvent(new CustomEvent('pageLoaded'))
  }
}

export { PageLoader as default }
