
module.exports = class SwaggerApi {
  constructor(path, { paths, tags, basePath }, options) {
    this.path = path
    this.options = options
    this.apis = paths[path]
    this._init()
  }

  _init() {
    const methods = Object.keys(this.apis)
    if (methods.length === 0) {
      return
    }

    methods.forEach(method => {
      const api = this.apis[method]
      const config = {
        method,
        url: this.path
      }
      api.config = config
    })

    // const configuration = api[method]
    // configuration.parameters.filter(param => {
    //   if (this.options.excludes) {
    //     return this.options.excludes.indexOf(param.name) < 0
    //   }
    //   return true
    // })
    // .filter(param => param.in === 'path')
    // .forEach(param => {
    //   // TODO
    // })
  }

  /**
   * 首页导航列表
   */
  configs() {
    const path = this.path.replace(/\//g, '_').replace(/^_/, '').replace(/[{|}]/g, '')
    return Object.values(this.apis).map(api => {
      const config = api.config
      const js = [
        `/**`,
        ` * ${api.summary}`,
        ` */`,
        `export const ${path}_${config.method} = {`,
        ``,
        `}`
      ]
      return js.join('\n')
    }).join('\n')
  }
}
