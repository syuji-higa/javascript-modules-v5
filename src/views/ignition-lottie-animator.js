import { createEvent } from '../utils/event'
import { lottie } from '../modules'

class IgnitionLottieAnimator {
  _selfClassName /* :string */ = ''
  _animations /* :string[] */ = {}
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
    const { selfClassName } = {
      ...IgnitionLottieAnimator._defaultOptions,
      ...options
    }

    this._selfClassName = selfClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    const _$$el = document.getElementsByClassName(this._selfClassName)

    for (const $el of Array.from(_$$el)) {
      const _triggerId /* :string */ = $el.dataset.triggerIgnitionerId

      if (_triggerId) {
        const _lottieId /* :string */ = $el.dataset.lottieId
        const _delay /* :string */ = $el.dataset.animationDelay || '0'

        if (!(_triggerId in this._animations)) {
          this._animations[_triggerId] = []
        }

        this._animations[_triggerId].push({
          id: _lottieId,
          delay: Number(_delay)
        })
      }
    }

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
    if (_id in this._animations) {
      for (const { id, delay } of this._animations[_id]) {
        setTimeout(() => {
          lottie.animate(id, 'show')
        }, delay)
      }
    }
  }
}

export { IgnitionLottieAnimator as default }
