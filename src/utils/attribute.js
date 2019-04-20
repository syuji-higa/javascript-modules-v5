import { pascalCaseTo } from '../models/string'

/**
 * @param {Element} $el
 * @param {string} name
 * @return {string}
 */
export const dataAttribute = ($el, name) => {
  return $el.dataset
    ? $el.dataset[name]
    : $el.getAttribute(`data-${pascalCaseTo(name, '-')}`)
}
