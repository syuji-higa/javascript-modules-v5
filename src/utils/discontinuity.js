/**
 * @param {Object} [options]
 * @param {number} [options.interval] - int[0,inf)
 * @param {number} [options.timeout] - int[0,inf)
 * @return {function(fn: function)}
 */
export const discontinuity = (options = {}) => {
  const { interval, timeout } = { interval: 50, timeout: 2000, ...options }

  let _flag /* :boolean */ = false
  let _lastTime /* :number */ = new Date().getTime()
  let _timeoutTime /* :number */ = _lastTime + timeout

  return (fn) => {
    const _time /* :number */ = new Date().getTime()
    const _isTimeout /* :boolean */ = _timeoutTime <= _time
    if (_isTimeout || _flag) {
      fn()
      _timeoutTime = _time + timeout
      _flag = false
    }
    if (!_isTimeout && _lastTime + interval <= _time) {
      _flag = true
    }
    _lastTime = _time
  }
}
