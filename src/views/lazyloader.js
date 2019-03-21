import { loadImage } from '../utils/load'
import { getBackgroundImages } from '../utils/background-image'

class Lazyloader {
  _selfClassName /* :string */ = ''
  _isLoadedClassName /* :string */ = ''
  _isImageSettedClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList */
  _observer /* :IntersectionObserver */
  _targets /* :Set */ = new Set()

  /**
   * @return {Object}
   */
  static get _defOptions() {
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
    const {
      selfClassName,
      isLoadedClassName,
      isImageSettedClassName
    } = Object.assign(Lazyloader._defOptions, options)

    this._selfClassName = selfClassName
    this._isLoadedClassName = isLoadedClassName
    this._isImageSettedClassName = isImageSettedClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)
    this._observer = new IntersectionObserver(this._inviewport.bind(this), {
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
    for (const $el /* :Element */ of Array.from(this._$$el)) {
      this.add($el)
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._targets.forEach(($el /* :Element */) => {
      this.remove($el)
    })
    return this
  }

  /**
   * @return {Instance}
   */
  add($el) {
    this._observer.observe($el)
    this._targets.add($el)
    return this
  }

  /**
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
  async _inviewport(entries) {
    const loadList /* :function[] */ = []

    for (const {
      target /* :Element */,
      isIntersecting /* :boolean */
    } of entries) {
      if (isIntersecting) {
        target.classList.add(this._isImageSettedClassName)
        const _srcList /* :string[] */ = this._setSrcList(target)
        this.remove(target)

        loadList.push(() => {
          return (async () => {
            await Promise.all(_srcList.map((src) => loadImage(src)))
            target.classList.add(this._isLoadedClassName)
          })()
        })
      }
    }

    await Promise.all(loadList.map((load /* :function */) => load()))
  }

  /**
   * @param {Element} $el
   */
  _setSrcList($el) {
    const _src /* :string */ = $el.dataset.src

    // img
    if ($el.src) {
      $el.src = _src
      return [_src]
    }
    // source
    else if ($el.srcset) {
      $el.srcset = _src
      return [_src]
    }

    // background-image
    const _bgImages /* string[] */ = getBackgroundImages($el)

    if (0 >= _bgImages.length) {
      console.warn(
        '"data-src" has not been set or Not find background-image, for lazyloader.'
      )
    }

    return _bgImages
  }
}

export { Lazyloader as default }
