/**
 * @param {*} arg
 * @return {boolean}
 */
export const isJson = (arg) => {
  const _val /* :* */ = typeof arg === 'function' ? arg() : arg
  if (typeof _val !== 'string') {
    return false
  }
  try {
    JSON ? JSON.parse(_val) : eval(`(${_val})`)
    return true
  } catch (err) {
    return false
  }
}
