import { charCount } from './string'

/**
 * @param {string} str
 * @return {boolean}
 */
export const isEntry = (str) => {
  return str !== ''
}

/**
 * @param {string} str
 * @return {boolean}
 */
export const isEmKana = (str) => {
  return !!str.match(/^[\u30A0-\u30FF]+$/)
}

/**
 * @param {string} str
 * @return {boolean}
 */
export const isEmailAddress = (str) => {
  return !!str.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
}

/**
 * @param {string} str
 * @return {boolean}
 */
export const isTell = (str) => {
  return !!str.match(
    /^[0-9０-９]{2,4}[-−]?[0-9０-９]{2,4}[-−]?[0-9０-９]{3,4}$/
  )
}

/**
 * @param {string} str
 * @return {boolean}
 */
export const isZipCode = (str) => {
  return !!str.match(/^[0-9０-９]{3}[-−]?[0-9０-９]{4}$/)
}

/**
 * @param {string} str
 * @return {boolean}
 */
export const isHalfNum = (str) => {
  return str.match(/^[0-9]+$/) ? true : false
}

/**
 * @param {string} str
 * @param {number} min - int[0,inf)
 * @param {number} max - int[0,inf)
 * @return {boolean}
 */
export const isStrRenge = (str, min, max) => {
  const _len /* :number - int[0,inf) */ = Math.ceil(charCount(str) / 2)
  return min <= _len && _len <= max
}

/**
 * @param {string} str
 * @param {number} min
 * @param {number} max
 * @return {boolean}
 */
export const isNumRenge = (str, min, max) => {
  const _num /* :number */ = Number(str)
  return min <= _num && _num <= max
}
