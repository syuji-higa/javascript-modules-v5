/**
 * @param {number} width - int[0,inf)
 * @param {number} height - int[0,inf)
 * @param {number} widthWidthRate - viewport width rate width / height float[0,inf)
 * @return {Object}
 * @property {number} width - int[0,inf)
 * @property {number} height - int[0,inf)
 * @property {number} x
 * @property {number} y
 */
export const cover = (width, height, widthWidthRate) => {
  const _orignRate /* :number - int[0,inf) */ = width / height

  if (widthWidthRate < _orignRate) {
    const _height /* :number - int[0,inf) */ = width / widthWidthRate
    return {
      width: width,
      height: _height,
      x: 0,
      y: (height - _height) / 2
    }
  } else {
    const _width /* :number - int[0,inf) */ = height * widthWidthRate
    return {
      width: _width,
      height: height,
      x: (width - _width) / 2,
      y: 0
    }
  }
}

/**
 * @param {number} w - int[0,inf)
 * @param {number} h - int[0,inf)
 * @return {Object}
 * @property {number} max - [1,inf)
 * @property {number} width - [1,inf)
 * @property {number} height - [1,inf)
 */
export const normalizeOverRatio = (w, h) => {
  const _maxRatio /* :number - [1,inf) */ = Math.max(w / h, h / w)
  return {
    max: _maxRatio,
    width: w > h ? _maxRatio : 1,
    height: h > w ? _maxRatio : 1
  }
}

/**
 * @param {number} w - int[0,inf)
 * @param {number} h - int[0,inf)
 * @return {Object}
 * @property {number} min - [0,1]
 * @property {number} width - [0,1]
 * @property {number} height - [0,1]
 */
export const normalizeUnderRatio = (w, h) => {
  const _minRatio /* :number - int[0,1] */ = Math.min(w / h, h / w)
  return {
    min: _minRatio,
    width: w > h ? 1 : _minRatio,
    height: h > w ? 1 : _minRatio
  }
}
