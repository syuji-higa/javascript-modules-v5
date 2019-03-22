class Inviewporter {
  _selfClassName /* :string */ = ''
  _isInviewportClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList */
  _observer /* :IntersectionObserver */
  _targets /* :Set */ = new Set()

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      selfClassName: 'js-inviewporter',
      isInviewportClassName: 'is-inviewport'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   * @param {string} [options.isLoadedClassName]
   */
  constructor(options = {}) {
    const { selfClassName, isInviewportClassName } = Object.assign(
      Inviewporter._defOptions,
      options
    )

    this._selfClassName = selfClassName
    this._isInviewportClassName = isInviewportClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)
    this._observer = new IntersectionObserver(this._upate.bind(this))
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$$el = null
    this._observer = null
    this._targets.clear()
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    for (const $el /* :Element */ of Array.from(this._$$el)) {
      this.add($el)
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._targets.forEach(($el /* :Element */) => {
      this.remove($el)
    })
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  add($el) {
    this._observer.observe($el)
    this._targets.add($el)
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._observer.unobserve($el)
    this._targets.delete($el)
    return this
  }

  /**
   * @param {Array<IntersectionObserverEntry>} entries
   */
  _upate(entries) {
    for (const {
      target /* :Element */,
      isIntersecting /* :boolean */
    } of entries) {
      if (isIntersecting) {
        target.classList.add(this._isInviewportClassName)
      } else {
        target.classList.remove(this._isInviewportClassName)
      }
    }
  }
}

export { Inviewporter as default }
