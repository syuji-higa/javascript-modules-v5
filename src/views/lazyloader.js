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
        const _srcList /* :string[] */ = this._getSrcList(target)
        this.remove(target)

        loadList.push(() => {
          return (async () => {
            await Promise.all(_srcList.map((src) => loadImage(src)))
            target.classList.add(this._isLoadedClassName)
          })()
        })
      }
    }

    await Promise.all(loadList.map((load) => load()))
  }

  /**
   * @param {Element} $el
   * @return {string[]}
   */
  _getSrcList($el) {
    // img
    if ($el.src) {
      const _src /* :string */ = $el.dataset.src
      $el.src = _src
      return [_src]
    }
    // source
    else if ($el.tagName.toLowerCase() === 'picture') {
      const _sources = []
      for (const $child of Array.from($el.children)) {
        const _tagName /* :string */ = $child.tagName.toLowerCase()
        let _src /* :string */ = ''
        switch (_tagName) {
          case 'source': {
            _src = $child.dataset.src
            $child.srcset = _src
            break
          }
          case 'img': {
            _src = $child.dataset.src
            $child.src = _src
            break
          }
          default: {
            break
          }
        }
        _sources.push(_src)
      }
      return _sources
    }

    // background-image
    const _bgImages /* string[] */ = getBackgroundImages($el)

    if (_bgImages.length) {
      return _bgImages
    }

    return []
  }
}

export { Lazyloader as default }
