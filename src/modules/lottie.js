/**
 * depends on 'vanix' used in 'store'
 */

import lottie from 'lottie-web'
import { store } from '../store'
import { parse } from '../models/query-string'

class Lottie {
  _selfClassName /* :string */ = ''
  _baseDir /* :string */ = ''
  _animations /* :Object */ = {}
  _lottieLoadEvents /* :Object[] */ = []

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-lottie',
      baseDir: `${store.state.assetsDir}/json`
    }
  }

  /**
   * @param {Object} [options]
   * @property {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName, baseDir } = {
      ...Lottie._defaultOptions,
      ...options
    }

    this._selfClassName = selfClassName
    this._baseDir = baseDir
  }

  /**
   * @return {Instance}
   */
  create() {
    const _$$el /* :HTMLCollection|NodeList */ = document.getElementsByClassName(
      this._selfClassName
    )

    for (const $el of Array.from(_$$el)) {
      const _id /* :string */ = $el.dataset.lottieId
      const _motions /* :string */ = $el.dataset.lottieMotions
      const _isMediaChange /* :boolean */ =
        $el.dataset.lottieMediaChange === 'true'

      let _suffix /* :string */ = ''
      if (_isMediaChange) {
        if (store.state.windowSizeType === 'mobile') {
          _suffix = '-sp'
        } else {
          _suffix = '-pc'
        }
      }

      const _title /* :string */ = $el.textContent
      $el.innerHTML = ''

      this._animations[_id] = {
        lottie: lottie.loadAnimation({
          container: $el,
          renderer: 'svg',
          autoplay: false,
          path: `${this._baseDir}/${_id}${_suffix}.json`
        }),
        motions: Object.entries(parse(_motions)).reduce((memo, [key, val]) => {
          // convert val example: '0,10' => [0,10]
          memo[key] = val.split(',').map((v) => Number(v))
          return memo
        }, {})
      }

      if (_title) {
        this._lottieLoadEvents.push({
          add: this._animations[_id].lottie.addEventListener(
            'DOMLoaded',
            this._addTitle.bind(this, [$el, _title]),
            { once: true }
          ),
          remove: this._animations[_id].lottie.removeEventListener(
            'DOMLoaded',
            this._addTitle
          )
        })
      }
    }

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    for (const animation of Object.values(this._animations)) {
      animation.lottie.destroy()
    }

    this._animations = {}
    this._lottieLoadEvents = []

    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    for (const event of this._lottieLoadEvents) {
      event.add()
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    for (const event of this._lottieLoadEvents) {
      event.remove()
    }
    return this
  }

  /**
   * @param {string} id
   * @param {string} motion
   * @return {Instance}
   */
  animate(id, motion) {
    const _animation /* :Object */ = this._animations[id]
    const _motion /* :number[] - int[0,inf) */ = _animation.motions[motion]
    _animation.lottie.playSegments(_motion, true)
    return this
  }

  /**
   * @param {string} id
   * @return {Instance}
   */
  play(id) {
    const _animation /* :Object */ = this._animations[id]
    _animation.lottie.play()
    return this
  }

  /**
   * @param {string} id
   * @return {Instance}
   */
  stop(id) {
    const _animation /* :Object */ = this._animations[id]
    _animation.lottie.stop()
    return this
  }

  /**
   * @param {string} id
   * @param {string} type
   * @return {?number[]} - int[0,inf)
   */
  getMotion(id, type) {
    const _animation /* :Object */ = this._animations[id]
    if (type in _animation.motions) {
      return [..._animation.motions[type]]
    } else {
      null
    }
  }

  /**
   * @param {string} id
   * @param {string} prop
   * @param {*} val
   * @return {Instance}
   */
  setOptions(id, prop, val) {
    const _animation /* :Object */ = this._animations[id]
    if (prop in _animation.lottie) {
      _animation.lottie[prop] = val
    }
    return this
  }

  /**
   * @param {Element} $el
   * @param {string} title
   */
  _addTitle($el, title) {
    const _$title /* :Element */ = document.createElement('title')
    _$title.textContent = title
    $el.getElementsByTagName('svg')[0].appendChild(_$title)
  }
}

export { Lottie as default }
