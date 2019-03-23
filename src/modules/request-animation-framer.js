class RequestAnimationFramer {
  _animes /* :Map */ = new Map()
  _animateHandle /* :number int[0,inf) */ = 0

  /**
   * @param {Object} key
   * @return {number} [0,inf)
   */
  getTime(key) {
    return this._animes.get(key).time
  }

  /**
   * @param {Object} key
   * @param {function} func
   * @return {Instance}
   */
  add(key, func) {
    this._animes.set(key, func)

    if (!this._animateHandle) {
      this._start()
    }
    return this
  }

  /**
   * @param {Object} key
   * @return {Instance}
   */
  remove(key) {
    this._animes.delete(key)
    if (!this._animes.size) {
      this._stop()
    }

    return this
  }

  _start() {
    if (this._animateHandle) {
      return
    }
    this._animate()
  }

  _stop() {
    cancelAnimationFrame(this._animateHandle)
    this._animateHandle = 0
  }

  _animate() {
    this._animateHandle = requestAnimationFrame(this._animate.bind(this))

    this._animes.forEach((func) => {
      func()
    })
  }
}

export { RequestAnimationFramer as default }
