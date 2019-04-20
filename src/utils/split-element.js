/**
 * @param {string} htmlStr
 * @param {Object} [options]
 * @param {string} [options.wrapTag]
 * @param {string} [options.className]
 * @param {Object} [options.attributes]
 * @param {string} [options.type] - 'line'|'word'|'character'
 * @param {number} [options.nest] - int[1,inf)
 * @return {DocumentFragment}
 */
export const splitElement = (htmlStr, options = {}) => {
  const _defOpts = {
    wrapTag: 'span',
    className: '',
    attributes: {},
    type: 'character',
    nest: 1
  }

  const { wrapTag, className, attributes, type, nest } = Object.assign(
    {},
    _defOpts,
    options
  )

  const _$tmp /* :Element */ = document.createElement('div')
  const _reg /* :RegExp */ = /<[^>]+>/g
  const _strings /* :string */ = htmlStr.split(_reg)
  const _tags /* :string */ = htmlStr.match(_reg)
  let _html /* :string */ = ''
  let _spaceCnt /* :number int[0,inf) */ = 0
  let _charCnt /* :number int[0,inf) */ = 0

  const _append = (
    str /* :string */,
    brIndex /* :number int[0,inf) */,
    wordIndex /* :number int[0,inf) */,
    charCnt /* :number int[0,inf) */,
    isSpace /* :boolean */ = false
  ) => {
    const _$char /* :Element */ = document.createElement(wrapTag)

    if (2 > nest) {
      _$char.textContent = str
    } else {
      let _$wrap /* :Element */ = _$char
      let _$inner /* :Element|null */ = null
      for (let i = 0; nest - 1 > i; i++) {
        _$inner = document.createElement(wrapTag)
        _$wrap.appendChild(_$inner)
        _$wrap = _$inner
      }
      _$inner.textContent = str
    }

    if (isSpace) {
      _$char.classList.add('char-space')
      _$char.classList.add(`char-space-${_spaceCnt}`)
    }
    if (className) {
      _$char.classList.add(className)
    }
    for (const [key, val] of Object.entries(attributes)) {
      // ###{} -> br
      let _val = val.replace(/###{(.+)}/g, (str, s) => {
        return Number(s) * brIndex
      })
      // ##{} -> word
      _val = _val.replace(/##{(.+)}/g, (str, s) => {
        return Number(s) * wordIndex
      })
      // #{} -> string
      _val = _val.replace(/#{(.+)}/g, (str, s) => {
        return Number(s) * charCnt
      })
      _$char.setAttribute(key, _val)
    }

    _$tmp.appendChild(_$char)
    _html += _$tmp.innerHTML
    _$tmp.innerHTML = ''
  }

  _strings.forEach((str, i) => {
    // unescape and string
    const _str /* :string[] */ = str.replace(/&amp;/g, '&')

    switch (type) {
      case 'line': {
        _append(_str, i)
        break
      }
      case 'word': {
        const _words /* :string[] */ = _str.split(' ')
        const _last /* :number int[0,inf) */ = _words.length - 1
        _words.forEach((w, i) => {
          const _w /* :string */ = _last > i ? `${w}\u00a0` : w
          _append(_w, i, _spaceCnt)
          _spaceCnt++
          _charCnt++
        })
        break
      }
      case 'character': {
        for (const s of [..._str]) {
          const _isSpace /* :boolean */ = s === ' '
          const _s /* :string */ = _isSpace ? '\u00a0' : s
          _append(_s, i, _spaceCnt, _charCnt, _isSpace)
          if (_isSpace) {
            _spaceCnt++
          }
          _charCnt++
        }
        break
      }
    }

    if (_tags && i in _tags) {
      _html += _tags[i]
    }
  })

  _$tmp.innerHTML = _html
  const _$df /* :DocumentFragment */ = document.createDocumentFragment()

  for (const $str of Array.from(_$tmp.children)) {
    _$df.appendChild($str)
  }

  return _$df
}
