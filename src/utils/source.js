import { load } from './load'

/**
 * @param {element} $el
 * @return {Promise<boolean>}
 */
export const replaceImageSource = ($el) => {
  return new Promise((resolve) => {
    if ('src' in $el) { // img
      $el.src = $el.dataset.src
      load($el).then(({ isSuccess }) => {
        resolve(isSuccess)
      })
    } else if ($el.tagName.toLowerCase() === 'picture') { // source
      let _$img = null
      for (const $child of Array.from($el.children)) {
        const _tagName /* :string */ = $child.tagName.toLowerCase()
        switch (_tagName) {
          case 'source': {
            $child.srcset = $child.dataset.src
            break
          }
          case 'img': {
            _$img = $child
            $child.src = $child.dataset.src
            break
          }
        }
      }
      if (_$img) {
        load(_$img).then(({ isSuccess }) => {
          resolve(isSuccess)
        })
      }
    } else {
      return resolve(false)
    }
  })
}
