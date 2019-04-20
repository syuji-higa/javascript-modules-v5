/**
 * @param {Element} $el
 * @return {string[]}
 */
export const getBackgroundImages = ($el) => {
  const _backgroundImage /* :string */ = getComputedStyle($el, '')
    .backgroundImage
  const _paths /* :string[] */ = []

  if (_backgroundImage === 'none') {
    return _paths
  }

  const _images /* :string[] */ = _backgroundImage.split(/,\s?/)

  if (!_images) {
    return _paths
  }

  for (const img of _images) {
    const _path /* :string */ = img.match(/^url\(['"]?(.+[0-9a-zA-Z])['"]?\)$/)

    if (typeof _path !== 'undefined' && _path !== null) {
      _paths.push(_path[1])
    }
  }

  return _paths
}
