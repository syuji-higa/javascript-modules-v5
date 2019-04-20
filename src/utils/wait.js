/**
 * @param {number} timer - int[0,inf)
 * @param {number} startTime - int[0,inf)
 * @param {number} interval - int[0,inf)
 * @param {number} timeout - int[0,inf)
 * @param {function} observe
 * @param {function} resolve
 * @param {function} returnValFn
 * @return {Promise}
 */
const check /* :function */ = (
  timer,
  startTime,
  interval,
  timeout,
  observe,
  resolve,
  returnValFn
) => {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    if (observe() || timeout < new Date().getTime() - startTime) {
      returnValFn ? resolve(returnValFn()) : resolve()
    } else {
      check(timer, startTime, interval, timeout, observe, resolve, returnValFn)
    }
  }, interval)
}

/**
 * @param {number} interval - int[0,inf)
 * @param {function} observe
 * @param {Object} [options]
 * @param {number} [options.timeout] - int[0,inf)
 * @param {?function} [options.returnValFn]
 * @return {Promise}
 */
export const wait = (interval, observe, options = {}) => {
  let { timeout, returnValFn } = Object.assign(
    { timeout: 30000, returnValFn: null },
    options
  )

  let _timer /* :number - [0,inf) */ = 0
  const _startTime /* :number - [0,inf) */ = new Date().getTime()

  return new Promise((resolve) => {
    check(_timer, _startTime, interval, timeout, observe, resolve, returnValFn)
  })
}
