/**
 * @param {number} time
 * @return {Promise}
 */
export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
