class SwipeStatus {
  _status = {
    isTouching /* :boolean */: false,
    isScrolling /* :boolean */: false,
    axis /* :string - 'x'|'y' */: '',
    touch: {
      x /* :number - int[0,inf) */: 0,
      y /* :number - int[0,inf) */: 0
    },
    delta: {
      x /* :number - int[0,inf) */: 0,
      y /* :number - int[0,inf) */: 0
    }
  }
  _reaction /* :number - int[0,inf) */ = 0

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      reaction /* :number - int[0,inf) */: 5
    }
  }

  /**
   * @param {Object} [options]
   * @param {number} [options.reaction] - int[0,inf)
   *
   * @example
   *   const ss = new SwipeStatus();
   *   document.addEventListener('touchstart', (e) => {
   *     if(ss.isTouching) return;
   *     const { pageX, pageY } = e.changedTouches[0];
   *     ss.start(pageX, pageY);
   *   });
   *   document.addEventListener('touchmove', (e) => {
   *     if(!ss.isTouching) return;
   *     const { pageX, pageY } = e.changedTouches[0];
   *     ss.move(pageX, pageY);
   *   });
   *   document.addEventListener('touchend', () => {
   *     const { direction, delta } = ss;
   *     ss.end();
   *   });
   */
  constructor(options = {}) {
    const { reaction } = { ...SwipeStatus._defaultOptions, ...options }

    this._reaction = reaction
  }

  /**
   * @param {number} x - int(-inf,inf)
   * @param {number} y - int(-inf,inf)
   */
  start(x, y) {
    this._status.isTouching = true
    this._status.touch.x = x
    this._status.touch.y = y
  }

  /**
   * @param {number} x - int(-inf,inf)
   * @param {number} y - int(-inf,inf)
   */
  move(x, y) {
    this._status.delta.x = x - this._status.touch.x
    this._status.delta.y = y - this._status.touch.y

    this._setAxis()
  }

  end() {
    this._status.isTouching = false
    this._status.isScrolling = false
    this._status.axis = ''
    this._status.touch.x = 0
    this._status.touch.y = 0
    this._status.delta.x = 0
    this._status.delta.y = 0
  }

  /**
   * @return {boolean}
   */
  get isTouching() {
    return this._status.isTouching
  }

  get axis() {
    return this._status.axis
  }

  get delta() {
    return this._status.delta[this._status.axis]
  }

  _setAxis() {
    if (this._status.axis) return

    const { x, y } = this._status.delta

    if (this._reaction < Math.abs(x)) {
      this._status.axis = 'x'
    }
    if (this._reaction < Math.abs(y)) {
      this._status.axis = 'y'
    }
  }
}

export { SwipeStatus as default }
