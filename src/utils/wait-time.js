/**
 * @param {number} time - int[0,inf)
 * @return {Promise}
 */
export const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
