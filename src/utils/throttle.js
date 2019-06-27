/**
 * @param {Object} [options]
 * @param {number} [options.interval] - int[0,inf)
 * @param {boolean} [options.isLastRun]
 * @return {function(fn: function)}
 */
export const throttle = (options = {}) => {
  const { interval, isLastRun } = {
    interval: 100,
    isLastRun: true,
    ...options
  }

  let _lastTime /* :number - int[0,inf) */ = new Date().getTime() - interval
  let _timer /* :number - int[0,inf) */ = 0

  return (fn) => {
    if (_lastTime + interval <= new Date().getTime()) {
      _lastTime = new Date().getTime()
      fn()
    }
    if (isLastRun) {
      clearTimeout(_timer)
      _timer = setTimeout(() => {
        fn()
        _timer = 0
      }, interval)
    }
  }
}
