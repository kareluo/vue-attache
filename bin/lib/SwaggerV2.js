const SwaggerApi = require('./SwaggerApi')

module.exports = class SwaggerV2 {
  constructor(json) {
    this.docs = JSON.parse(json)
    this._init()
  }

  _init() {
    this.apis = Object.keys(this.docs.paths).map(path => {
      return new SwaggerApi(path, this.docs, {
        excludes: ['token', 'loginId']
      })
    })
  }

  configs() {
    return this.apis.map(api => api.configs()).join('\n\n')
  }
}
