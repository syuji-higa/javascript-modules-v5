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
 * @param {string} src
 * @param {Object} [options]
 * @param {funciton} [options.done]
 * @param {funciton} [options.fail]
 * @param {funciton} [options.always]
 * @return {Promise}
 */
export const loadImage = (src, options = {}) => {
  const { done, fail, always } = options

  return new Promise((resolve) => {
    const _img /* :Image */ = new Image()

    const _always = (img /* :Image */, isSuccess /* :boolean */) => {
      if (always) always(img)
      resolve(img, isSuccess)
    }

    _img.onload = () => {
      if (done) done(_img)
      _always(_img, true)
    }
    _img.onerror = () => {
      if (fail) fail(_img)
      _always(_img, false)
    }

    _img.src = src
  })
}

/**
 * @param {string} file
 * @param {Object} [options]
 * @param {funciton} [options.done]
 * @param {funciton} [options.fail]
 * @param {funciton} [options.always]
 * @return {Promise}
 */
export const loadFile = (file, options = {}) => {
  const { done, fail, always } = options

  return new Promise((resolve) => {
    const _reader /* :FileRender */ = new FileReader()

    const _always /* :function */ = (
      file_ /* :FileRender */,
      isSuccess /* :boolean */
    ) => {
      if (always) always(file_)
      resolve(isSuccess)
    }

    _reader.onload = (file_) => {
      if (done) done(file_)
      _always(file_, true)
    }
    _reader.onerror = (file_) => {
      if (fail) fail(file_)
      _always(file_, false)
    }

    _reader.readAsDataURL(file)
  })
}
