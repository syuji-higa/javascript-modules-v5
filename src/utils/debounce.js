/**
 * @param {Object} [options]
 * @param {number} [options.interval] - int[0,inf)
 * @param {boolean} [options.isFirstRun]
 * @return {function}
 */
export const debounce = (options = {}) => {
  const { interval, isFirstRun } = Object.assign(
    { interval: 100, isFirstRun: false },
    options
  )
  let _timer /* :number - int[0,inf) */ = 0
  let _firstRun /* :boolean */ = true

  return (fn /* :function */) => {
    if (isFirstRun && _firstRun) {
      fn()
      _firstRun = false
    }
    clearTimeout(_timer)
    _timer = setTimeout(() => {
      fn()
      _timer = 0
      if (isFirstRun) {
        _firstRun = true
      }
    }, interval)
  }
}
