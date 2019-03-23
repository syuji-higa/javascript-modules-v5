/**
 * @param {number} time
 * @return {Promise}
 */
export const sleep = (time) => {
  return new Promise((resolve /* :function */) => {
    setTimeout(resolve, time)
  })
}
