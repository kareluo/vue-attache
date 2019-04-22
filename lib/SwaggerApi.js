
module.exports = class SwaggerApi {
  constructor(path, { paths, tags, basePath }, options) {
    // TODO url with dynamic path args
    this.config = {
      url: path
    }
    this.path = path
    this.options = options
    this._init(paths[path])
  }

  _init(api) {
    const methods = Object.keys(api)
    if (methods.length === 0) {
      return
    }

    const method = methods[0]
    this.config.method = method

    this.config.url = this.path

    const configuration = api[method]
    configuration.parameters.filter(param => {
      if (this.options.excludes) {
        return this.options.excludes.indexOf(param.name) < 0
      }
      return true
    })
    .filter(param => param.in === 'path')
    .forEach(param => {
      // TODO
    })
  }

  config() {
    return this.config
  }
}