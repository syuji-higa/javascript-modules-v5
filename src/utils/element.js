import { toPascalCase } from '../models/string'

/**
 * @param {Element} $el
 * @param {string} selector
 * @param {boolean} [isSlefTarget]
 * @return {?Element}
 */
export const includesElement = ($el, selector, isSlefTarget = true) => {
  const _elms /* :Element[] */ = Array.from(document.querySelectorAll(selector))
  const _$el /* :Element */ = isSlefTarget ? $el : $el.parentNode

  const _getParent = ($el /* :Element */) /* :Element */ => {
    if (!$el || !$el.tagName || $el.tagName === 'HTML') return null

    if (_elms.includes($el)) {
      return $el
    }

    return _getParent($el.parentNode)
  }

  return _getParent(_$el)
}

/**
 * @param {Elemtnt} el
 * @param {string} dataName
 * @param {Object} [options]
 * @param {boolean} [options.needsSingle]
 * @param {?function} [options.filter]
 * @return {Object}
 */
export const groupByDataElement = (el, dataName, options = {}) => {
  const { needsSingle, filter } = Object.assign(
    {
      needsSingle: false,
      filter: null
    },
    options
  )

  const _$$el /* :HTMLCollection|NodeList */ = el.querySelectorAll(
    `[data-${dataName}]`
  )
  return Array.from(_$$el).reduce((memo /* :Object */, $el /* :Element */) => {
    if (!filter || filter($el)) {
      const _dataName /* :string */ =
        'dataset' in $el
          ? $el.dataset[toPascalCase(dataName, '-')]
          : $el.getAttribute(`data-${dataName}`)
      if (_dataName) {
        if (needsSingle) {
          memo[_dataName] = $el
        } else {
          if (!memo[_dataName]) {
            memo[_dataName] = []
          }
          memo[_dataName].push($el)
        }
      }
    }
    return memo
  }, {})
}

/**
 * @param {HTMLCollection|NodeList} $$el
 * @return {Element[]}
 */
export const shownElement = ($$el) => {
  return Array.from($$el).filter(($el) => {
    return getComputedStyle($el, '').display !== 'none'
  })
}
