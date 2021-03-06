/**
 * depends on 'vanix' used in 'store'
 */

import { imagePreloader } from '../modules'

class PageLoader {
  _isWindowLoaded /* :boolean */ = false
  _isImagesPreloaded /* :boolean */ = false
  _isOtherCompleted /* :boolean */ = false
  _otherPromises /* :functon[] */ = []
  _isPageLoadedClassName /* :string */ = ''
  _isPageShownClassName /* :string */ = ''
  _showDuration /* :number */ = 0 // int[0,inf)

  static get _defaultOptions() {
    return {
      isPageLoadedClassName: 'is-page-loaded',
      isPageShownClassName: 'is-page-shown',
      showDuration: 1000
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.isPageLoadedClassName]
   * @param {string} [options.isPageShownClassName]
   * @param {string} [options.showDuration]
   */
  constructor(options = {}) {
    const { isPageLoadedClassName, isPageShownClassName, showDuration } = {
      ...PageLoader._defaultOptions,
      ...options
    }

    this._isPageLoadedClassName = isPageLoadedClassName
    this._isPageShownClassName = isPageShownClassName
    this._showDuration = showDuration

    window.addEventListener('load', this._onWindowLoad.bind(this), {
      once: true
    })
  }

  /**
   * @return {Instance}
   */
  add(fn) {
    this._otherPromises.push(fn)
    return this
  }

  /**
   * @return {Instance}
   */
  start() {
    this._preloadImages()
    this._startOhterPromises()
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

  /**
   * @return {Promise}
   */
  async _startOhterPromises() {
    await Promise.all(this._otherPromises.map((fn) => fn()))
    this._isOtherCompleted = true
    this._mightAllLoaded()
  }

  _mightAllLoaded() {
    const _isAllLoaded /* :boolean */ =
      this._isWindowLoaded && this._isImagesPreloaded && this._isOtherCompleted
    if (!_isAllLoaded) {
      return
    }

    document.documentElement.classList.add(this._isPageLoadedClassName)
    document.dispatchEvent(new CustomEvent('pageLoaded'))

    setTimeout(() => {
      document.documentElement.classList.add(this._isPageShownClassName)
    }, this._showDuration)
  }
}

export { PageLoader as default }
