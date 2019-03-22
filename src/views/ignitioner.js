class Ignitioner {
  _selfClassName /* :string */ = ''
  _isIgnitedClassName /* :string */ = ''
  _$$el /* :HTMLCollection|NodeList */
  _observer /* :IntersectionObserver */
  _targets /* :Set */ = new Set()

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      selfClassName: 'js-ignitioner',
      isIgnitedClassName: 'is-ignited'
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.selfClassName]
   * @param {string} [options.isLoadedClassName]
   */
  constructor(options = {}) {
    const { selfClassName, isIgnitedClassName } = Object.assign(
      Ignitioner._defOptions,
      options
    )

    this._selfClassName = selfClassName
    this._isIgnitedClassName = isIgnitedClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)
    this._observer = new IntersectionObserver(this._update.bind(this), {
      rootMargin: '-10% 0% -10% 0%'
    })
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
  _update(entries) {
    for (const {
      target /* :Element */,
      isIntersecting /* :boolean */
    } of entries) {
      if (isIntersecting) {
        target.classList.add(this._isIgnitedClassName)
        this.remove(target)
      }
    }
  }
}

export { Ignitioner as default }
