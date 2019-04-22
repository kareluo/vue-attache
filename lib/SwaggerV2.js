const SwaggerApi = require('./SwaggerApi')

module.exports = class SwaggerV2 {
  constructor(json) {
    this.config = JSON.parse(json)
    this._init()
  }

  _init() {
    this.apis = Object.keys(this.config.paths).map(path => {
      return new SwaggerApi(path, this.config)
    })
  }
}
