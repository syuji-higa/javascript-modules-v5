/**
 * @param {number} rad
 * @return {number}
 */
export const toAngle = (rad) => {
  return (rad * 180) / Math.PI
}

/**
 * @param {number} ang
 * @return {number}
 */
export const toRadian = (ang) => {
  return (ang * Math.PI) / 180
}

/**
 * @param {number} num
 * @return {number}
 */
export const decimal = (num) => {
  return parseFloat('0.' + String(num).split('.')[1])
}

/**
 * @param {number} num
 * @param {number} [digit] - int
 * @return {number}
 */
export const round = (num, digit = 6) => {
  const _digit /* :number int */ = Math.pow(10, digit)
  return Math.round(num * _digit) / _digit
}

/**
 * @param {number} num
 * @param {number} [digit] - int
 * @return {number}
 */
export const floor = (num, digit = 6) => {
  const _digit /* :number int */ = Math.pow(10, digit)
  return Math.floor(num * _digit) / _digit
}

/**
 * @param {number} num
 * @param {number} [digit] - int
 * @return {number}
 */
export const ceil = (num, digit = 6) => {
  const _digit /* :number int */ = Math.pow(10, digit)
  return Math.ceil(num * _digit) / _digit
}

/**
 * @param {number} num
 * @return {number} -1|0|1
 */
export const sign = (num) => {
  return num > 0 ? 1 : num < 0 ? -1 : 0
}

/**
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const clamp = (num, min, max) => {
  return min > num ? min : max < num ? max : num
}

/**
 * @param {number} num - int
 * @param {number} min - int
 * @param {number} max - int
 * @return {number} int
 */
export const hoop = (num, min, max) => {
  const _range /* :number - int[0,inf) */ = max - min + 1
  let _num /* :number - int */ = (num - min) % _range
  if (0 > _num) {
    _num = _range + _num
  }
  return _num + min
}

/**
 * @param {number} num - int[0,inf)
 * @return {number} int[0,inf)
 */
export const toTowPower = (num) => {
  return Math.pow(2, (Math.log(num) / Math.LN2) | 0)
}

/**
 * @param {number} frame - int[0,inf)
 * @param {number} fps - [0,inf)
 * @return {number} [0,inf)
 */
export const frameToTime = (frame, fps = 60) => {
  return (1000 / fps) * frame
}

/**
 * @param {number} time - int[0,inf)
 * @param {number} fps - [0,inf)
 * @return {number} [0,inf)
 */
export const timeToFrame = (time, fps = 60) => {
  return (time * fps) / 1000
}
