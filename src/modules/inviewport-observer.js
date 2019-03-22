class InviewportObserver {
  _observer /* :IntersectionObserver */
  _functions /* :WeakMap */ = new WeakMap()

  /**
   * @return {Instance}
   */
  create() {
    this._observer = new IntersectionObserver(this._update.bind(this))
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._observer = null
    return this
  }

  /**
   * @param {Element} $el
   * @param {function} func
   * @return {Instance}
   */
  add($el, func) {
    this._functions.set($el, func)
    this._observer.observe($el)
    return this
  }

  /**
   * @param {Element} $el
   * @return {Instance}
   */
  remove($el) {
    this._functions.delete($el)
    this._observer.unobserve($el)
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
        this._functions.get(target)(true)
      } else {
        this._functions.get(target)(false)
      }
    }
  }
}

export { InviewportObserver as default }
