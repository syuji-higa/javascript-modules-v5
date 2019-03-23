class ControlledRequestAnimationFramer {
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
   * @param {number} fps - int[0,inf)
   * @param {number} [interval] - int[0,inf)
   * @return {Instance}
   */
  add(key, func, fps, interval = 0) {
    this._animes.set(key, {
      startTime /* :number [0,inf) */: new Date().getTime(),
      time /* :number [0,inf) */: 0,
      frameStartTime /* :number [0,inf) */: 0,
      ms /* :number [0,inf) */: fps === 'auto' ? 0 : Math.floor(1000 / fps),
      count /* :number int[0,inf) */: 0,
      interval /* :number int[0,inf) */: interval + 1,
      func /* :function */: func
    })

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

    const _time = new Date().getTime()

    this._animes.forEach(({ frameStartTime, ms, count, interval, func }, c) => {
      const _anime /* :Object */ = this._animes.get(key)
      _anime.count++
      _anime.time = _time - _anime.startTime
      if (count % interval || ms > _time - frameStartTime) {
        return
      }
      _anime.frameStartTime = _time
      func(key)
    })
  }
}

export { ControlledRequestAnimationFramer as default }
