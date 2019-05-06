const SwaggerV2Api = require('./SwaggerV2Api')

module.exports = class SwaggerV2 {
  constructor(docs, options) {
    this.docs = docs
    this.options = options
    this._init()
  }

  _init() {
    this.apis = Object.keys(this.docs.paths).map(path => {
      return new SwaggerV2Api(path, this.docs, this.options)
    })
  }

  configs() {
    return this.apis.map(api => api.configs()).join('\n\n')
  }
}
