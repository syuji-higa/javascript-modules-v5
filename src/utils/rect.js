let _viewportY /* :number float */ = 0
let _viewportX /* :number float */ = 0

/**
 * @param {Element} $viewport
 */
const _reset = ($viewport) => {
  if ($viewport) {
    const {
      top /* :number float */,
      left /* :number float */
    } = $viewport.getBoundingClientRect()
    _viewportY = $viewport.scrollTop - top
    _viewportX = $viewport.scrollLeft - left
  } else {
    _viewportY = window.pageYOffset
    _viewportX = window.pageXOffset
  }
}

/**
 * @param {Element} $el
 * @param {?Element} $viewport
 * @return {Object}
 * @property {number} width - float[0,inf)
 * @property {number} height - float[0,inf)
 * @property {number} top - float
 * @property {number} right - float
 * @property {number} bottom - float
 * @property {number} left - float
 */
export const rect = ($el, $viewport = null) => {
  _reset($viewport)
  const {
    width,
    height,
    top,
    right,
    bottom,
    left
  } = $el.getBoundingClientRect()
  return {
    width,
    height,
    top: top + _viewportY,
    right: right + _viewportX,
    bottom: bottom + _viewportY,
    left: left + _viewportX
  }
}

/**
 * @param {Element} $el
 * @param {?Element} [$viewport]
 * @return {Object}
 * @property {number} x - float
 * @property {number} y - float
 */
export const center = ($el, $viewport = null) => {
  const _rect = /* :Object */ rect($el, $viewport)
  return {
    x /* :number float */: _rect.left + _rect.width / 2,
    y /* :number float */: _rect.top + _rect.height / 2
  }
}
