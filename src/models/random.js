/**
 * @param {number} num
 * @param {number} [min]
 * @return {number}
 */
export const random = (num, min = 0) => {
  return Math.random() * (num - min) + min
}

/**
 * @param {number} num - int
 * @param {number} [min] - int
 * @return {number} int
 */
export const randomInt = (num, min = 0) => {
  return Math.floor(random(num + 1, min))
}

/**
 * @return {number} -1|1
 */
export const randomDir = () => {
  return randomInt(1) ? 1 : -1
}
