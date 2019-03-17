/**
 * @param {string} str
 * @return {Object}
 * @property {string} href - example: 'http://localhost:3000/about/index.html?param#hash'
 * @property {string} hrefPathname - example: 'http://localhost:3000/about/index.html'
 * @property {string} hrefDirname - example: 'http://localhost:3000/about/'
 * @property {string} origin - example: 'http://localhost:3000'
 * @property {string} protocol  - example: 'http:'
 * @property {string} host - example: 'localhost:3000'
 * @property {string} hostname - example: 'localhost'
 * @property {string} port - example: '3000'
 * @property {string} local - example: '/about/index.html?param#hash'
 * @property {string} pathname - example: '/about/index.html'
 * @property {string} dirname - example: '/about/'
 * @property {string} filename - example: 'index.html'
 * @property {string} extname - example: 'html'
 * @property {string} search - example: '?param'
 * @property {string} hash - example: '#hash'
 */
export const parseUrl = (str) => {
  const _urlStrs /* :string[] */ = str.match(
    /^(http:|https:)\/\/([^\/:]+):?([0-9]{1,5})?(\/[^?#]*)(\?[^#]+)?(#.*)?$/
  )

  if (!_urlStrs) return null

  const [
    _href,
    _protocol,
    _hostname,
    _port,
    _pathname,
    _search,
    _hash
  ] = _urlStrs

  const _host /* :string */ = _port ? `${_hostname}:${_port}` : _hostname
  const _origin /* :string */ = `${_protocol}//${_host}`
  const _local /* :string */ = (() => {
    let _pn /* :string */ = _pathname
    if (_search) _pn += _search
    if (_hash) _pn += _hash
    return _pn
  })()
  const _filenameStrs /* :string[] */ = _pathname.match(
    /^[^.]*(\/(.+\.(.+)))?$/
  )
  const _dirname /* :string */ = _pathname.replace(_filenameStrs[2], '')

  return {
    href: _href,
    hrefPathname: _origin + _pathname,
    hrefDirname: _origin + _dirname,
    origin: _origin,
    local: _local,
    protocol: _protocol,
    host: _host,
    hostname: _hostname,
    port: _port,
    pathname: _pathname,
    dirname: _dirname,
    filename: _filenameStrs[2],
    extname: _filenameStrs[3],
    search: _search,
    hash: _hash
  }
}

/**
 * @param {string} href
 * @return {boolean}
 */
export const isMatchLocation = (href) => {
  const { origin /* :string */, pathname /* :string */ } = parseUrl(
    location.href
  )

  const _rx /* :RegExp */ = new RegExp(`^${origin}${pathname}(\\\?.+)?(#.*)?$`)

  return !!href.match(_rx)
}
