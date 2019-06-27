import { frameToTime } from '../models/math'
import { createEvent } from '../utils/event'
import { waitTime } from '../utils/wait-time'
import { lottie } from '../modules'
import { store } from '../store'

class LottieAnimator {
  _selfClassName /* :string */ = ''
  _animations /* :Object[] */ = []
  _ignitionEvent /* :Object */ = {}
  _storeStateObject /* :Object */ = {}

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      selfClassName: 'js-lottie-animator'
    }
  }

  /**
   * @param {Object}
   * @property {Object} [options]
   * @property {string} [options.selfClassName]
   */
  constructor(options = {}) {
    const { selfClassName } = {
      ...LottieAnimator._defaultOptions,
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
      const _ignitionId /* :string */ = $el.dataset.triggerIgnitionId
      const _inviewportId /* :string */ = $el.dataset.loopInviewportId

      if (_ignitionId || _inviewportId) {
        const _lottieId /* :string */ = $el.dataset.lottieId
        const _delay /* :string */ = $el.dataset.animationDelay || '0'

        this._animations.push({
          id: _lottieId,
          ignitionId: _ignitionId,
          inviewportId: _inviewportId,
          delay: Number(_delay),
          state: {
            ignited: false,
            loop: false
          }
        })
      }
    }

    this._ignitionEvent = createEvent(
      document,
      'ignition',
      this._onIgnition.bind(this)
    )

    this._storeStateObject = {
      inviewports: () => {
        this.update()
      }
    }

    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._ignitionEvent = {}
    this._storeStateObject = {}
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    this._ignitionEvent.add()
    store.observe(this._storeStateObject)
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._ignitionEvent.remove()
    store.unobserve(this._storeStateObject)
    return this
  }

  /**
   * @return {Instance}
   */
  update() {
    for (const animation of this._animations) {
      const { id, inviewportId } = animation
      const _hasInviewportId /* :boolean */ = !!inviewportId
      const _isLoop /* :boolean */ = animation.state.loop

      if (!(_hasInviewportId && _isLoop)) {
        continue
      }

      const _isInviewport /* :boolean */ = store.state.inviewports.includes(
        inviewportId
      )
      if (_isInviewport) {
        lottie.play(id)
      } else {
        lottie.stop(id)
      }
    }

    return this
  }

  /**
   * @param {Envet} e
   */
  _onIgnition(e) {
    const _id /* :strings */ = e.detail.id
    const _animations /* :Object[] */ = this._animations.filter((animation) => {
      return animation.ignitionId === _id
    })

    for (const animation of _animations) {
      const { id, delay } = animation
      const _show /* :number - int[0,inf) */ = lottie.getMotion(id, 'show')
      const _loop /* :number - int[0,inf) */ = lottie.getMotion(id, 'loop')

      ;(async () => {
        await waitTime(delay)

        if (_show) {
          lottie.animate(id, 'show')
          animation.state.ignited = true
        }

        if (_loop) {
          const _showDuration /* :number - int[0,inf) */ = _show
            ? frameToTime(_show[1] - _show[0])
            : 0
          await waitTime(_showDuration)

          lottie.setOptions(id, 'loop', true).animate(id, 'loop')
          animation.state.loop = true
        }
      })()
    }
  }
}

export { LottieAnimator as default }
