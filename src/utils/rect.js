let _viewportY /* :number */ = 0
let _viewportX /* :number */ = 0

/**
 * @param {Element} $viewport
 */
const _reset = ($viewport) => {
  if ($viewport) {
    const {
      top /* :number */,
      left /* :number */
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
 * @property {number} width - [0,inf)
 * @property {number} height - [0,inf)
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
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
 * @property {number} x -
 * @property {number} y -
 */
export const center = ($el, $viewport = null) => {
  const _rect = /* :Object */ rect($el, $viewport)
  return {
    x /* :number */: _rect.left + _rect.width / 2,
    y /* :number */: _rect.top + _rect.height / 2
  }
}
