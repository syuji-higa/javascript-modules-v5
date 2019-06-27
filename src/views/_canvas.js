/**
 * depends on 'vanix' used in 'store'
 */

import { store } from '../store'

class Canvas {
  _selfClassName /* :string */ = ''
  _$wrap /* :Element|null */ = null
  _$canvas /* :Element|null */ = null
  _$ctx /* :CanvasRenderingContext2D|null */ = null
  _dpr /* :number - [0,inf) */ = 0
  _storeStateObject /* :Object */ = {}

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-grid'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = { ...Canvas._defaultOptions, ...options }

    this._selfClassName = selfClassName
    this._dpr = devicePixelRatio || 1
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$wrap = document.getElementsByClassName(this._selfClassName)[0]
    this._$canvas = document.createElement('canvas')

    if (!this._$canvas || !this._$canvas.getContext) {
      return
    }

    this._$wrap.appendChild(this._$canvas)
    this._ctx = this._$canvas.getContext('2d')

    this._storeStateObject = {
      windowWidth: () => {
        this.update()
      },
      windowHeight: () => {
        this.update()
      }
    }

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$wrap.innerHTML = ''

    this._$el = null
    this._storeStateObject = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    store.observe(this._storeStateObject)
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    store.unobserve(this._storeStateObject)
    return this
  }

  /**
   * @return {Instance}
   */
  update() {
    const _width /* :number - [0,inf) */ = this._$wrap.clientWidth * this._dpr
    const _height /* :number - [0,inf) */ = this._$wrap.clientHeight * this._dpr

    this._$canvas.width = _width
    this._$canvas.height = _height

    this._$canvas.style.width = `${_width / this._dpr}px`
    this._$canvas.style.height = `${_height / this._dpr}px`

    this.draw()

    return this
  }

  /**
   * @return {Instance}
   */
  draw() {
    this._ctx.fillStyle = 'rgb(0, 0, 0)'
    this._ctx.fillRect(0, 0, 200, 200)

    return this
  }
}

export { Canvas as default }
