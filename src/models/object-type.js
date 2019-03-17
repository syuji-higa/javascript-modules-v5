const toString /* :function */ = Object.prototype.toString

/**
 * @param {*} target
 * @return {string}
 */
export const objectType = (target) => {
  const _strs /* :string[] */ = toString.call(target).match(/^\[object (.+)\]$/)
  return _strs[1]
}
