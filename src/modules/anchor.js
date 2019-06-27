/**
 * depends on 'vanix' used in 'store'
 */

import { round } from '../models/math'
import { progress } from '../models/progress'
import { rect } from '../utils/rect'
import { requestAnimationFramer } from '../modules'
import { store } from '../store'

class Anchor {
  _duration /* :number - int[0,inf) */ = 0
  _easing /* :string */ = ''
  _startTime /* :number - int[0,inf) */ = 0

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      duration: 1000,
      easing: 'easeInOutCubic'
    }
  }

  /**
   * @param {Object} [options]
   */
  constructor(options = {}) {
    const { duration, easing } = { ...Anchor._defaultOptions, ...options }

    this._duration = duration
    this._easing = easing
  }

  /**
   * @param {Element} $target
   */
  scroll($target) {
    const _offsetY = store.state.windowOffsetY
    const _rectTop = round(rect($target).top)

    this._startTime = Date.now()

    requestAnimationFramer.add(
      this,
      this._animate.bind(this, _offsetY, _rectTop)
    )
  }

  /**
   * @param {number} begin - int(-inf,inf)
   * @param {number} complete - int(-inf,inf)
   */
  _animate(begin, complete) {
    const _time /* :number - int[0,inf) */ = Date.now() - this._startTime
    const _val /* :number */ = progress(
      this._easing,
      _time,
      begin,
      complete,
      this._duration
    )

    window.scrollTo(0, _val)

    if (complete === _val) {
      requestAnimationFramer.remove(this)
    }
  }
}

export { Anchor as default }
