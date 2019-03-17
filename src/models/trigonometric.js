/**
 * @param {number} base
 * @param {number} radian
 * @return {number}
 */
export const hypotenuseFromBaseRadian = (base, radian) => {
  return base / Math.sin(radian)
}

/**
 * @param {number} height
 * @param {number} radian
 * @return {number}
 */
export const hypotenuseFromHeightRadian = (height, radian) => {
  return height / Math.sin(radian)
}

/**
 * @param {number} base
 * @param {number} height
 * @return {number}
 */
export const hypotenuseFromBaseHeight = (base, height) => {
  return Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2))
}

/**
 * @param {number} base
 * @param {number} radian
 * @return {number}
 */
export const heightFromBaseRadian = (base, radian) => {
  return base * Math.tan(radian)
}

/**
 * @param {number} hypotenuse
 * @param {number} radian
 * @return {number}
 */
export const heightFromHypotenuseRadian = (hypotenuse, radian) => {
  return hypotenuse * Math.sin(radian)
}

/**
 * @param {number} base
 * @param {number} hypotenuse
 * @return {number}
 */
export const heightFromBaseHypotenuse = (base, hypotenuse) => {
  return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2))
}

/**
 * @param {number} height
 * @param {number} radian
 * @return {number}
 */
export const baseFromHeightRadian = (height, radian) => {
  return height / Math.tan(radian)
}

/**
 * @param {number} hypotenuse
 * @param {number} radian
 * @return {number}
 */
export const baseFromHypotenuseRadian = (hypotenuse, radian) => {
  return hypotenuse * Math.cos(radian)
}

/**
 * @param {number} height
 * @param {number} hypotenuse
 * @return {number}
 */
export const baseFromHeightHypotenuse = (height, hypotenuse) => {
  return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(height, 2))
}

/**
 * @param {number} base
 * @param {number} height
 * @return {number}
 */
export const radianFromBaseHeight = (base, height) => {
  return Math.atan2(height, base)
}

/**
 * @param {number} base
 * @param {number} hypotenuse
 * @return {number}
 */
export const radianFromBaseHypotenuse = (base, hypotenuse) => {
  return Math.acos(base / hypotenuse)
}

/**
 * @param {number} height
 * @param {number} hypotenuse
 * @return {number}
 */
export const radianFromHeightHypotenuse = (height, hypotenuse) => {
  return Math.asin(height / hypotenuse)
}
