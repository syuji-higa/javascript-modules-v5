import { getBackgroundImages } from '../utils/background-image'
import { loadImage } from '../utils/load'
import { wait } from '../utils/wait'

class ImagePreloader {
  _status /* :WeakMap */ = new WeakMap()
  _images /* :Map */ = new Map()

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      images: [],
      needsElementLoad: true
    }
  }

  /**
   * @param {Element} $el
   * @param {Object} [options]
   * @param {Element[]} [options.images]
   * @param {boolean} [options.needsElementLoad]
   * @return {Promsie}
   */
  async add($el, options = {}) {
    const { images, needsElementLoad } = Object.assign(
      ImagePreloader._defOptions,
      options
    )

    const _images /* :Set */ = new Set()

    // init images
    for (const img /* :Element */ of images) {
      if (!this._images.has(img)) {
        _images.add(img)
      }
    }

    // wrap element background image
    for (const bgImg /* :string */ of getBackgroundImages($el)) {
      if (bgImg && !this._images.has(bgImg)) {
        _images.add(bgImg)
      }
    }

    // child elements background images
    for (const $child /* :Element */ of $el.getElementsByTagName('*')) {
      for (const bgImg /* :string */ of getBackgroundImages($child)) {
        if (bgImg && !this._images.has(bgImg)) {
          _images.add(bgImg)
        }
      }
    }

    if (needsElementLoad) {
      // img elements images
      await Promise.all(
        Array.from($el.getElementsByTagName('img'), async (
          $img /* :Element */
        ) => {
          if (!$img.getAttribute('src')) {
            return
          }
          let _img /* :string */ = ''
          await wait(200, () /* :string */ => {
            _img = 'currentSrc' in $img ? $img.currentSrc : $img.src
            return _img
          })
          if (_img && !this._images.has(_img)) {
            _images.add(_img)
          }
        })
      )

      // video elements posters
      Array.from($el.getElementsByTagName('video'), ($video /* :Element */) => {
        const _poster /* :string */ = $video.poster
        if (_poster && !this._images.has(_poster)) {
          _images.add(_poster)
        }
      })

      // svg image elements images
      Array.from($el.getElementsByTagName('image'), ($img /* :Element */) => {
        const _img /* :string */ = $img.getAttribute('xlink:href')
        if (_img && !this._images.has(_img)) {
          _images.add(_img)
        }
      })
    }

    this._status.set($el, {
      images /* :Set */: _images,
      loadedLen /* :number int[0,inf) */: 0
    })
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._status.delete($el)
    return this
  }

  /**
   * @param {Element} $el
   * @return {Promise}
   */
  load($el) {
    const _loaders = this.getLoaders($el)
    return Promise.all(
      _loaders.map((loader /* :function */) /* :Promise */ => loader())
    )
  }

  /**
   * @param {Element} $el
   * @return {Array<function>}
   */
  getLoaders($el) {
    const _images /* :Set */ = this._status.get($el).images

    return [..._images].map((src /* :string */) => {
      return this._load.bind(this, $el, src)
    })
  }

  /**
   * @param {Element} $el
   * @return {Array<string>}
   */
  getImages($el) {
    return this._status.get($el).images
  }

  /**
   * @param {Element} $el
   * @return {number}
   */
  getLoadedLen($el) {
    return this._status.get($el).loadedLen
  }

  /**
   * @param {Element} $el
   * @param {string} src
   * @return {Promise}
   */
  _load($el, src) {
    return loadImage(src, {
      done: (img /* :Image */) => {
        this._images.set(src, {
          src /* :string */: img.src,
          width /* :number int[0,inf) */: img.width,
          height /* :number int[0,inf) */: img.height
        })
      },
      always: () => {
        this._status.get($el).loadedLen++
      }
    })
  }
}

export { ImagePreloader as default }
