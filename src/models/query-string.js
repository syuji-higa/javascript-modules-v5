/**
 * @param {string} str
 * @param {Object} [options]
 * @param {string} [options.sep]
 * @param {string} [options.eq]
 * @param {boolean} [options.typeChange]
 * @return {Object}
 */
export const parse = (str, options = {}) => {
  const { sep, eq, typeChange } = Object.assign(
    {
      sep: '&',
      eq: '=',
      typeChange: true
    },
    options
  )
  if (!str || typeof str !== 'string') {
    return {}
  }
  return String(str)
    .split(sep)
    .reduce((obj /* :Object */, param /* :string */) => {
      const [key /* :string */, val /* :string */] = param.split(eq)
      const _val /* :string|number|boolean */ = (() => {
        if (!typeChange) return val
        if (val.match(/^[+,-]?([1-9]\d*|0)(\.\d+)?$/)) {
          return Number(val)
        }
        switch (val) {
          case 'true':
            return true
          case 'false':
            return false
          default:
            return val
        }
      })()
      obj[key] /* :string|number|boolean */ = _val
      return obj
    }, {})
}

/**
 * @param {Object} data
 * @param {Object} [options]
 * @param {string} [options.sep]
 * @param {string} [options.eq]
 * @return {string}
 */
export const serialize = (data, options = {}) => {
  const { sep, eq } = Object.assign({ sep: '&', eq: '=' }, options)
  const _encode /* :function */ = encodeURIComponent
  let _query /* :string */ = ''

  Object.entries(data).forEach(
    ([key /* :string */, val /* :string|number|Object|*[] */]) => {
      const _type /* :string */ =
        typeof val === 'object' && val instanceof Array ? 'array' : typeof val

      switch (_type) {
        case 'undefined':
          _query += key
          break
        case 'array':
          val.forEach((_i) => {
            _query += `${key}[]${eq + _encode(val[_i]) + sep}`
          })
          _query = _query.substr(0, _query.length - 1)
          break
        case 'object':
          Object.entries(val).forEach(([key_ /* :string */, val_ /* :* */]) => {
            _query += `${key}[${key_}]${eq + _encode(val_) + sep}`
          })
          _query = _query.substr(0, _query.length - 1)
          break
        default:
          _query += key + eq + _encode(val)
          break
      }
      _query += sep
    }
  )
  return _query.substr(0, _query.length - 1)
}
