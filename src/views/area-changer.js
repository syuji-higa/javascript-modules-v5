import { eventer } from '../modules'
import { store } from '../store'

class AreaChanger {
  _state = {
    index /* :number */: 0,
    disabledWheel /* :boolean */: false
  }
  _lastIndex /* :number */ = 0
  _wrapClassName /* :string */ = ''
  _$wrap /* :?Element */
  _areaClassName /* :string */ = ''
  _$$area /* :?(HTMLCollection|NodeList) */
  _wheelEvent /* :Object */ = {}
  _onescrollEvent /* :Object */ = {}
  _isLocatedClassName /* :string */ = ''
  _isInareaClassName /* :string */ = ''

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      wrapClassName: 'js-area-changer',
      areaClassName: 'js-area-changer-item',
      isLocatedClassName: 'is-located',
      isInareaClassName: 'is-inarea'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.wrapClassName]
   * @param {string} [options.areaClassName]
   * @param {string} [options.isLocatedClassName]
   * @param {string} [options.isInareaClassName]
   */
  constructor(options = {}) {
    const {
      wrapClassName,
      areaClassName,
      isLocatedClassName,
      isInareaClassName
    } = {
      ...AreaChanger._defaultOptions,
      ...options
    }

    this._wrapClassName = wrapClassName
    this._areaClassName = areaClassName
    this._isLocatedClassName = isLocatedClassName
    this._isInareaClassName = isInareaClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$wrap = document.getElementsByClassName(this._wrapClassName)[0]
    this._$$area = this._$wrap.getElementsByClassName(this._areaClassName)

    this._lastIndex = this._$$area.length - 1

    this._wheelEvent = eventer.create(
      window,
      'wheel',
      this._onWindowWheel.bind(this),
      { passive: false }
    )

    this._onescrollEvent = eventer.create(
      document,
      'onescroll',
      this._onOnescroll.bind(this)
    )

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$wrap = null
    this._wheelEvent = {}
    this._onescrollEvent = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    this._onescrollEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._onescrollEvent.remove()
    return this
  }

  /**
   * @param {number} dirction
   * @return {Instance}
   */
  move(dirction) {
    const _curtIndex = this._state.index
    const _nextIndex = this._state.index + dirction

    this.update(_nextIndex, _curtIndex)

    return this
  }

  /**
   * @param {number} nextIndex
   * @param {number} [curtIndex]
   * @return {Instance}
   */
  update(nextIndex, curtIndex = null) {
    this._state.index = nextIndex

    if (curtIndex !== null) {
      this._$$area[curtIndex].classList.remove(this._isLocatedClassName)
    }
    this._$$area[nextIndex].classList.add(this._isLocatedClassName)

    setTimeout(() => {
      // enable wheel
      if (this._state.disabledWheel && nextIndex === this._lastIndex) {
        document.documentElement.classList.remove(this._isInareaClassName)
        this._state.disabledWheel = false
        this._wheelEvent.remove()
      }
      // disable wheel
      else if (
        !this._state.disabledWheel &&
        nextIndex !== this._lastIndex &&
        store.state.windowOffsetY === 0
      ) {
        document.documentElement.classList.add(this._isInareaClassName)
        this._state.disabledWheel = true
        this._wheelEvent.add()
      }
    }, 500)

    return this
  }

  /**
   * @param e {Event}
   */
  _onWindowWheel(e) {
    e.preventDefault()
  }

  /**
   * @param e {Event}
   */
  _onOnescroll(e) {
    if (store.state.windowOffsetY !== 0) {
      return
    }

    let _dirction = 0

    switch (e.detail.dirction) {
      case 'prev': {
        if (0 < this._state.index) {
          _dirction = -1
        }
        break
      }
      case 'next': {
        if (this._lastIndex > this._state.index) {
          _dirction = +1
        }
        break
      }
    }

    this.move(_dirction)
  }
}

export { AreaChanger as default }
