/**
 * @param {string} str
 * @return {string}
 */
export const toHalfNum = (str) => {
  return str.replace(/[０-９]/g, (
    s /* :'０'|'１'|'２'|'３'|'４'|'５'|'６'|'７'|'８'|'９' */
  ) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  })
}

/**
 * @param {string} str
 * @return {string}
 */
export const toCommaNum = (str) => {
  const _strs /* :string[] */ = str.split('.')
  if (!_strs[0] || !_strs[0].match(/[0-9]+/)) {
    throw new Error(`'${_strs[0]}' is not number string.`)
  }
  const _decimal /* :string */ = _strs[1]
  const _integer /* :string */ = _strs[0]
    .replace(/,/g, '')
    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  return _decimal ? `${_integer}.${_decimal}` : _integer
}

/**
 * @param {string} str
 * @param {number} digit - int[0,inf)
 * @return {string}
 */
export const toZeroPadding = (str, digit) => {
  const _digit /* :number int[0,inf) */ = str.split('.')[0].length
  const _diff /* :number int */ = digit - _digit
  let _zero /* :string */ = ''
  for (let i /* :number int[0,inf) */ = 0; _diff > i; i++) {
    _zero += '0'
  }
  return _zero + str
}

/**
 * @param {string} str
 * @return {string}
 */
export const ucfirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @param {string} str
 * @return {string}
 */
export const toFirstLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
}

/**
 * @param {string} str
 * @return {string}
 */
export const kebabToPascalCase = (str) => {
  return str.replace(/-./g, (s /* :string */) /* :string */ => {
    return s.charAt(1).toUpperCase()
  })
}

/**
 * @param {string} str
 * @return {string}
 */
export const pascalToKebabCase = (str) => {
  return str.replace(/([A-Z])/g, (s /* :string */) /* :string */ => {
    return '-' + s.charAt(0).toLowerCase()
  })
}

/**
 * @param {string} str
 * @return {number}
 */
export const charCount = (str) => {
  let _count /* :number int[0,inf) */ = 0
  const _escapeStr /* :string */ = escape(str)
  for (
    let i /* :number int[0,inf) */ = 0;
    i < _escapeStr.length;
    i++, _count++
  ) {
    if (_escapeStr.charAt(i) === '%') {
      if (_escapeStr.charAt(++i) === 'u') {
        i += 3
        _count++
      }
      i++
    }
  }
  return _count
}
