class Singleton {
  /**
   * @type {Object}
   */
  static _instance = {}

  /**
   * @type {Object}
   */
  static _isInternal = {}

  /**
   * @return {Instance}
   */
  static getInstance() {
    const { _instance, _isInternal } = Singleton
    const _name /* :string */ = this.name
    if (_instance[_name]) {
      return Singleton._instance[_name]
    }
    _isInternal[_name] /* :boolean */ = true
    return new this()
  }

  constructor() {
    const { _isInternal, _instance } = Singleton
    const _name /* :string */ = this.constructor.name
    if (!_isInternal[_name]) {
      throw new Error(
        `Can't call new ${_name}(), use ${_name}.getInstance() instead.`
      )
    }
    _isInternal[_name] /* :boolean */ = false
    _instance[_name] /* :Instance */ = this
  }
}

export { Singleton as default }
