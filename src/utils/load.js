/**
 * @param {Element} $video
 * @return {Promise}
 */
export const loadVideo = ($video) => {
  return new Promise((resolve) => {
    $video.load()
    $video.addEventListener(
      'canplaythrough',
      () => {
        resolve()
      },
      { once: true }
    )
  })
}

/**
 * @param {Element} $el
 * @param {Object} [options]
 * @param {funciton} [options.done]
 * @param {funciton} [options.fail]
 * @param {funciton} [options.always]
 * @return {Promise}
 */
const load = ($el, options = {}) => {
  const { done, fail, always } = options

  return new Promise((resolve) => {
    const _always /* :function */ = (
      $el /* :Element */,
      isSuccess /* :boolean */
    ) => {
      if (always) {
        always($el)
      }
      resolve({ $el, isSuccess })
    }

    $el.onload = () => {
      if (done) {
        done($el)
      }
      _always($el, true)
    }
    $el.onerror = () => {
      if (fail) {
        fail($el)
      }
      _always($el, false)
    }
  })
}

/**
 * @param {string} src
 * @param {Object} [options]
 * @param {funciton} [options.done]
 * @param {funciton} [options.fail]
 * @param {funciton} [options.always]
 * @return {Promise}
 */
export const loadImage = (src, options = {}) => {
  const _img /* :Image */ = new Image()

  return new Promise((resolve) => {
    ;(async () => {
      const { $el, isSuccess } = load(_img, options)
      resolve({ $el, isSuccess })
    })()

    _img.src = src
  })
}

/**
 * @param {string} src
 * @param {Object} [options]
 * @param {funciton} [options.done]
 * @param {funciton} [options.fail]
 * @param {funciton} [options.always]
 * @return {Promise}
 */
export const loadFile = (src, options = {}) => {
  const _reader /* :FileReader */ = new FileReader()

  return new Promise((resolve) => {
    ;(async () => {
      const { $el, isSuccess } = load(_img, options)
      resolve({ $el, isSuccess })
    })()

    _reader.readAsDataURL(src)
  })
}
