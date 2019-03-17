/**
 * @param {number} num - int[0,inf)
 * @param {?*} val
 * @return {*[]}
 */
export const createArray = (num, val) => {
  const _arr /* :*[] */ = []

  for (let i /* :number int[0,inf) */ = 0; num > i; i++) {
    _arr[i] = val
  }

  return _arr
}

/**
 * @param {number} num - int[0,inf)
 * @param {number} [start] - int
 * @return {*[]}
 */
export const createSerialNumberArray = (num, start = 0) => {
  const _arr /* :*[] */ = []

  for (let i /* :number int[0,inf) */ = 0; num > i; i++) {
    _arr[i] = start + i
  }

  return _arr
}

/**
 * @param {*[]} arr
 * @return {*[]}
 */
export const shuffleArray = (arr) => {
  let _n /* :number int[0,inf) */ = arr.length
  let _t /* :number int[0,inf) */ = 0
  let _i /* :number int[0,inf) */ = 0

  while (_n) {
    _i = Math.floor(Math.random() * _n--)
    _t = arr[_n]
    arr[_n] = arr[_i]
    arr[_i] = _t
  }

  return arr
}

/**
 * @param {*[]} arr
 * @return {*[]}
 */
export const flattenArray = (arr) => {
  return arr.reduce((memo, val) => {
    return Array.isArray(val)
      ? memo.concat(flattenArray(val))
      : memo.concat(val)
  }, [])
}

/**
 * @param {*[]} arr
 * @param {number} num - int[0,inf)
 * @return {*[]}
 */
export const caterpillarArray = (arr, num) => {
  if (0 < num) {
    arr.push(...arr.splice(0, num))
  } else if (0 > num) {
    arr.unshift(...arr.splice(num, arr.length - num))
  }
  return arr
}
