/**
 * squares
 */

/**
 * @param {number} col - int[0,inf)
 * @param {number} x - int[0,inf)
 * @param {number} y - int[0,inf)
 * @return {number} int[0,inf)
 */
export const squaresIndex = (col, x, y) => {
  return col * y + x
}

/**
 * @param {number} col - int[0,inf)
 * @param {number} index - int[0,inf)
 * @return {number[]} int[0,inf)
 * @property {number} - int[0,inf)  x position
 * @property {number} - int[0,inf)  y position
 */
export const squaresPosition = (col, index) => {
  const x /* :number - int[0,inf) */ = index % col
  const y /* :number - int[0,inf) */ = (index - x) / col
  return [x, y]
}
