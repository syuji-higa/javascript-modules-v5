/**
 * @param {number} num
 * @param {number} max
 * @param {number} [min]
 * @return {number} [0,1]
 */
export const normalizeZeroOne = (num, max, min = 0) => {
  return num / (max - min)
}

/**
 * @param {number} num
 * @param {number} [range] - [0,inf)
 * @return {number} [-1,1]
 */
export const normalizeZeroCenter = (num, range = 1) => {
  return num * 2 - range
}
