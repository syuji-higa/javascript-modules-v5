import { createEvent } from '../utils/event'
import { lottie } from '../modules'

class IgnitionLottieAnimator {
  _selfClassName /* :string */ = ''
  _targetIds /* :string[] */ = []
  _ignitionEvent /* :Object */ = {}

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-ignition-lottie-animator'
    }
  }

  /**
   * @param {Object}
   * @property {Object} [options]
   * @property {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = Object.assign(
      IgnitionLottieAnimator._defaultOptions,
      options
    )

    this._selfClassName = selfClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    const _$$el = document.getElementsByClassName(this._selfClassName)
    this._targetIds = Array.from(_$$el, ($el) => {
      return $el.dataset.lottieId
    })

    this._ignitionEvent = createEvent(
      document,
      'ignition',
      this._update.bind(this)
    )

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._ignitionEvent = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    this._ignitionEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._ignitionEvent.remove()
    return this
  }

  /**
   * @param {Envet} e
   */
  _update(e) {
    const _id /* :strings */ = e.detail.id
    if (this._targetIds.includes(_id)) {
      lottie.animate(_id, 'show')
    }
  }
}

export { IgnitionLottieAnimator as default }
