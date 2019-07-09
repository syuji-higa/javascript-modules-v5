import { getBackgroundImages } from '../utils/background-image'
import { loadImage } from '../utils/load'
import { replaceImageSource } from '../utils/source'

class Lazyloader {
  _selfClassName /* :string */ = ''
  _isLoadedClassName /* :string */ = ''
  _isImageSettedClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList|null */ = null
  _observer /* :IntersectionObserver|null */ = null
  _targets /* :Set */ = new Set()

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-lazyloader',
      isLoadedClassName: 'is-lazyloaded',
      isImageSettedClassName: 'is-image-setted'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   * @param {string} [options.isLoadedClassName]
   * @param {string} [options.isImageSettedClassName]
   */
  constructor(options = {}) {
    const { selfClassName, isLoadedClassName, isImageSettedClassName } = {
      ...Lazyloader._defaultOptions,
      ...options
    }

    this._selfClassName = selfClassName
    this._isLoadedClassName = isLoadedClassName
    this._isImageSettedClassName = isImageSettedClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)
    this._observer = new IntersectionObserver(this._update.bind(this), {
      rootMargin: '-10% 0% -10% 0%'
    })
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$$el = null
    this._observer = null
    this._targets.clear()
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    for (const $el of Array.from(this._$$el)) {
      this.add($el)
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._targets.forEach(($el) => {
      this.remove($el)
    })
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  add($el) {
    this._observer.observe($el)
    this._targets.add($el)
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._observer.unobserve($el)
    this._targets.delete($el)
    return this
  }

  /**
   * @param {Array<IntersectionObserverEntry>} entries
   * @return {Promise}
   */
  async _update(entries) {
    const loadList /* :function[] */ = []

    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        target.classList.add(this._isImageSettedClassName)
        this.remove(target)

        loadList.push(
          new Promise(async (resolve) => {
            // img or picture
            const _isSuccess /* :boolean */ = await replaceImageSource(target)

            // background image
            if (!_isSuccess) {
              const _bgImages /* :string[] */ = getBackgroundImages(target)
              await Promise.all(_bgImages.map((src) => loadImage(src)))
            }

            target.classList.add(this._isLoadedClassName)

            resolve()
          })
        )
      }
    }

    await Promise.all(loadList.map((load) => load()))
  }
}

export { Lazyloader as default }
