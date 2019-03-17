export const easings = {
  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  linear: (t, b, c, d) => {
    return (c * t) / d + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [s]
   * @return {number}
   */
  easeInBack: (t, b, c, d, s = 1.70158) => {
    let _t = t
    return c * (_t /= d) * _t * ((s + 1) * _t - s) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [s]
   * @return {number}
   */
  easeInOutBack: (t, b, c, d, s = 1.70158) => {
    let _t = t
    if ((_t /= d / 2) < 1) {
      return (c / 2) * (_t * _t * ((s * 1.525 + 1) * _t - s * 1.525)) + b
    }
    return (
      (c / 2) * ((_t -= 2) * _t * ((s * 1.525 + 1) * _t + s * 1.525) + 2) + b
    )
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [s]
   * @return {number}
   */
  easeOutBack: (t, b, c, d, s = 1.70158) => {
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [s]
   * @return {number}
   */
  easeOutInBack: (t, b, c, d, s = 1.70158) => {
    let _t = t
    if (_t < d / 2) {
      return (
        (c / 2) * ((_t = (_t * 2) / d - 1) * _t * ((s + 1) * _t + s) + 1) + b
      )
    }
    return (
      (c / 2) * (_t = (_t * 2 - d) / d) * _t * ((s + 1) * _t - s) + (b + c / 2)
    )
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInBounce: (t, b, c, d) => {
    let _t = t
    if ((_t = (d - _t) / d) < 0.36363636363636365) {
      return c - c * (7.5625 * _t * _t) + b
    }
    if (_t < 0.7272727272727273) {
      return c - c * (7.5625 * (_t -= 0.5454545454545454) * _t + 0.75) + b
    }
    if (t < 0.9090909090909091) {
      return c - c * (7.5625 * (_t -= 0.8181818181818182) * _t + 0.9375) + b
    }
    return c - c * (7.5625 * (_t -= 0.9545454545454546) * _t + 0.984375) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutBounce: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      if ((_t = (d - _t * 2) / d) < 0.36363636363636365) {
        return (c - c * (7.5625 * _t * _t)) * 0.5 + b
      }
      if (_t < 0.7272727272727273) {
        return (
          (c - c * (7.5625 * (_t -= 0.5454545454545454) * _t + 0.75)) * 0.5 + b
        )
      }
      if (_t < 0.9090909090909091) {
        return (
          (c - c * (7.5625 * (_t -= 0.8181818181818182) * _t + 0.9375)) * 0.5 +
          b
        )
      }
      return (
        (c - c * (7.5625 * (_t -= 0.9545454545454546) * _t + 0.984375)) * 0.5 +
        b
      )
    } else {
      if ((_t = (_t * 2 - d) / d) < 0.36363636363636365) {
        return c * (7.5625 * _t * _t) * 0.5 + c * 0.5 + b
      }
      if (_t < 0.7272727272727273) {
        return (
          c * (7.5625 * (_t -= 0.5454545454545454) * _t + 0.75) * 0.5 +
          c * 0.5 +
          b
        )
      }
      if (_t < 0.9090909090909091) {
        return (
          c * (7.5625 * (_t -= 0.8181818181818182) * _t + 0.9375) * 0.5 +
          c * 0.5 +
          b
        )
      }
      return (
        c * (7.5625 * (_t -= 0.9545454545454546) * _t + 0.984375) * 0.5 +
        c * 0.5 +
        b
      )
    }
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutBounce: (t, b, c, d) => {
    let _t = t
    if ((_t /= d) < 0.36363636363636365) {
      return c * (7.5625 * _t * _t) + b
    }
    if (_t < 0.7272727272727273) {
      return c * (7.5625 * (_t -= 0.5454545454545454) * _t + 0.75) + b
    }
    if (_t < 0.9090909090909091) {
      return c * (7.5625 * (_t -= 0.8181818181818182) * _t + 0.9375) + b
    }
    return c * (7.5625 * (_t -= 0.9545454545454546) * _t + 0.984375) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInBounce: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      if ((_t = (_t * 2) / d) < 0.36363636363636365) {
        return (c / 2) * (7.5625 * _t * _t) + b
      }
      if (_t < 0.7272727272727273) {
        return (c / 2) * (7.5625 * (_t -= 0.5454545454545454) * _t + 0.75) + b
      }
      if (_t < 0.9090909090909091) {
        return (c / 2) * (7.5625 * (_t -= 0.8181818181818182) * _t + 0.9375) + b
      }
      return (c / 2) * (7.5625 * (_t -= 0.9545454545454546) * _t + 0.984375) + b
    } else {
      if ((_t = (d - (_t * 2 - d)) / d) < 0.36363636363636365) {
        return c / 2 - (c / 2) * (7.5625 * _t * _t) + (b + c / 2)
      }
      if (_t < 0.7272727272727273) {
        return (
          c / 2 -
          (c / 2) * (7.5625 * (_t -= 0.5454545454545454) * _t + 0.75) +
          (b + c / 2)
        )
      }
      if (_t < 0.9090909090909091) {
        return (
          c / 2 -
          (c / 2) * (7.5625 * (_t -= 0.8181818181818182) * _t + 0.9375) +
          (b + c / 2)
        )
      }
      return (
        c / 2 -
        (c / 2) * (7.5625 * (_t -= 0.9545454545454546) * _t + 0.984375) +
        (b + c / 2)
      )
    }
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInCirc: (t, b, c, d) => {
    let _t = t
    return -c * (Math.sqrt(1 - (_t /= d) * _t) - 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutCirc: (t, b, c, d) => {
    let _t = t
    if ((_t /= d / 2) < 1) {
      return (-c / 2) * (Math.sqrt(1 - _t * _t) - 1) + b
    }
    return (c / 2) * (Math.sqrt(1 - (_t -= 2) * _t) + 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutCirc: (t, b, c, d) => {
    let _t = t
    return c * Math.sqrt(1 - (_t = _t / d - 1) * _t) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInCirc: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      return (c / 2) * Math.sqrt(1 - (_t = (_t * 2) / d - 1) * _t) + b
    }
    return (
      -(c / 2) * (Math.sqrt(1 - (_t = (_t * 2 - d) / d) * _t) - 1) + (b + c / 2)
    )
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInCubic: (t, b, c, d) => {
    let _t = t
    return c * (_t /= d) * _t * _t + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutCubic: (t, b, c, d) => {
    let _t = t
    if ((_t /= d / 2) < 1) {
      return (c / 2) * _t * _t * _t + b
    }
    return (c / 2) * ((_t -= 2) * _t * _t + 2) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   * @return {number}
   */
  easeOutCubic: (t, b, c, d) => {
    let _t = t
    return c * ((_t = _t / d - 1) * _t * _t + 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInCubic: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      return (c / 2) * ((_t = (_t * 2) / d - 1) * _t * _t + 1) + b
    }
    return (c / 2) * (_t = (_t * 2 - d) / d) * _t * _t + b + c / 2
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [a]
   * @param {number} [p]
   * @return {number}
   */
  easeInElastic: (t, b, c, d, a = 0, p = 0) => {
    let _t = t
    let _a = a
    let s = undefined
    if (_t === 0) {
      return b
    }
    if ((_t /= d) === 1) {
      return b + c
    }
    const _p = p ? p : d * 0.3
    if (!_a || _a < Math.abs(c)) {
      _a = c
      s = _p / 4
    } else {
      s = (_p / (2 * Math.PI)) * Math.asin(c / _a)
    }
    return (
      -(
        _a *
        Math.pow(2, 10 * (_t -= 1)) *
        Math.sin(((_t * d - s) * (2 * Math.PI)) / _p)
      ) + b
    )
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [a]
   * @param {number} [p]
   * @return {number}
   */
  easeInOutElastic: (t, b, c, d, a = 0, p = 0) => {
    let _t = t
    let _a = a
    let s = undefined
    if (_t === 0) {
      return b
    }
    if ((_t /= d / 2) === 2) {
      return b + c
    }
    const _p = p ? p : d * (0.3 * 1.5)
    if (!_a || _a < Math.abs(c)) {
      _a = c
      s = _p / 4
    } else {
      s = (_p / (2 * Math.PI)) * Math.asin(c / _a)
    }
    if (_t < 1) {
      return (
        -0.5 *
          (_a *
            Math.pow(2, 10 * (_t -= 1)) *
            Math.sin(((_t * d - s) * (2 * Math.PI)) / _p)) +
        b
      )
    }
    return (
      _a *
        Math.pow(2, -10 * (_t -= 1)) *
        Math.sin(((_t * d - s) * (2 * Math.PI)) / _p) *
        0.5 +
      c +
      b
    )
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [a]
   * @param {number} [p]
   * @return {number}
   */
  easeOutElastic: (t, b, c, d, a = 0, p = 0) => {
    let _t = t
    let _a = a
    let _s = undefined
    if (_t === 0) {
      return b
    }
    if ((_t /= d) === 1) {
      return b + c
    }
    const _p = p ? p : d * 0.3
    if (!_a || _a < Math.abs(c)) {
      _a = c
      _s = _p / 4
    } else {
      _s = (_p / (2 * Math.PI)) * Math.asin(c / _a)
    }
    return (
      _a *
        Math.pow(2, -10 * _t) *
        Math.sin(((_t * d - _s) * (2 * Math.PI)) / _p) +
      c +
      b
    )
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @param {number} [a]
   * @param {number} [p]
   * @return {number}
   */
  easeOutInElastic: (t, b, c, d, a = 0, p = 0) => {
    const _c = (c /= 2)
    const _p = p ? p : d * 0.3
    let _t = t
    let _a = a
    let s = undefined
    if (_t < d / 2) {
      if ((_t *= 2) === 0) {
        return b
      }
      if ((_t /= d) === 1) {
        return b + _c
      }
      if (!_a || _a < Math.abs(_c)) {
        _a = _c
        s = _p / 4
      } else {
        s = (_p / (2 * Math.PI)) * Math.asin(_c / _a)
      }
      return (
        _a *
          Math.pow(2, -10 * _t) *
          Math.sin(((_t * d - s) * (2 * Math.PI)) / _p) +
        _c +
        b
      )
    } else {
      if ((_t = _t * 2 - d) === 0) {
        return b + _c
      }
      if ((_t /= d) === 1) {
        return b + _c + _c
      }
      if (!_a || _a < Math.abs(_c)) {
        _a = _c
        s = _p / 4
      } else {
        s = (_p / (2 * Math.PI)) * Math.asin(_c / _a)
      }
      return (
        -(
          _a *
          Math.pow(2, 10 * (_t -= 1)) *
          Math.sin(((_t * d - s) * (2 * Math.PI)) / _p)
        ) +
        (b + _c)
      )
    }
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInExpo: (t, b, c, d) => {
    if (t === 0) {
      return b
    }
    return c * Math.pow(2, 10 * (t / d - 1)) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutExpo: (t, b, c, d) => {
    let _t = t
    if (_t === 0) {
      return b
    }
    if (_t === d) {
      return b + c
    }
    if ((_t /= d / 2) < 1) {
      return (c / 2) * Math.pow(2, 10 * (_t - 1)) + b
    }
    return (c / 2) * (2 - Math.pow(2, -10 * --_t)) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutExpo: (t, b, c, d) => {
    if (t === d) {
      return b + c
    }
    return c * (1 - Math.pow(2, (-10 * t) / d)) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInExpo: (t, b, c, d) => {
    if (t < d / 2) {
      if (t * 2 === d) {
        return b + c / 2
      } else {
        return (c / 2) * (1 - Math.pow(2, (-10 * t * 2) / d)) + b
      }
    }
    if (t * 2 - d === 0) {
      return b + c / 2
    } else {
      return (c / 2) * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2
    }
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInQuad: (t, b, c, d) => {
    let _t = t
    return c * (_t /= d) * _t + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutQuad: (t, b, c, d) => {
    let _t = t
    if ((_t /= d / 2) < 1) {
      return (c / 2) * _t * _t + b
    }
    return (-c / 2) * (--_t * (_t - 2) - 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutQuad: (t, b, c, d) => {
    let _t = t
    return -c * (_t /= d) * (_t - 2) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInQuad: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      return -(c / 2) * (_t = (_t * 2) / d) * (_t - 2) + b
    }
    return (c / 2) * (_t = (_t * 2 - d) / d) * _t + (b + c / 2)
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInQuart: (t, b, c, d) => {
    let _t = t
    return c * (_t /= d) * _t * _t * _t + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutQuart: (t, b, c, d) => {
    let _t = t
    if ((_t /= d / 2) < 1) {
      return (c / 2) * _t * _t * _t * _t + b
    }
    return (-c / 2) * ((_t -= 2) * _t * _t * _t - 2) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutQuart: (t, b, c, d) => {
    let _t = t
    return -c * ((_t = _t / d - 1) * _t * _t * _t - 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInQuart: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      return -(c / 2) * ((_t = (_t * 2) / d - 1) * _t * _t * _t - 1) + b
    }
    return (c / 2) * (_t = (_t * 2 - d) / d) * _t * _t * _t + (b + c / 2)
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInQuint: (t, b, c, d) => {
    let _t = t
    return c * (_t /= d) * _t * _t * _t * _t + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutQuint: (t, b, c, d) => {
    let _t = t
    if ((_t /= d / 2) < 1) {
      return (c / 2) * _t * _t * _t * _t * _t + b
    }
    return (c / 2) * ((_t -= 2) * _t * _t * _t * _t + 2) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutQuint: (t, b, c, d) => {
    let _t = t
    return c * ((_t = _t / d - 1) * _t * _t * _t * _t + 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInQuint: (t, b, c, d) => {
    let _t = t
    if (_t < d / 2) {
      return (c / 2) * ((_t = (_t * 2) / d - 1) * _t * _t * _t * _t + 1) + b
    }
    return (c / 2) * (_t = (_t * 2 - d) / d) * _t * _t * _t * _t + (b + c / 2)
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInSine: (t, b, c, d) => {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeInOutSine: (t, b, c, d) => {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutSine: (t, b, c, d) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b
  },

  /**
   * @param {number} t - time
   * @param {number} b - begin
   * @param {number} c - change
   * @param {number} d - duration
   * @return {number}
   */
  easeOutInSine: (t, b, c, d) => {
    if (t < d / 2) {
      return (c / 2) * Math.sin(((t * 2) / d) * (Math.PI / 2)) + b
    }
    return (
      -(c / 2) * Math.cos(((t * 2 - d) / d) * (Math.PI / 2)) +
      c / 2 +
      (b + c / 2)
    )
  }
}
