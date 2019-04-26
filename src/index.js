import { install } from './install'
import Config, { use } from './net/config'
import ApiAttache from './net/ApiAttache'

export default class Attache {
  constructor ({ configs, config }) {
    this.configs = configs
    this.config = Object.assign(Object.create(Config), config)
    this.attaches = []
  }

  setConfigs (configs) {
    // TODO 清理attaches
    this.configs = configs
  }

  setup (component) {
    if (!this.configs) return
    this.configs.forEach(cfg => {
      const config = Object.assign(Object.create(this.config), cfg)
      const attache = new ApiAttache(config)
      attache.setup(component)
      this.attaches.push(attache)
    })
  }

  use (config) {
    Object.assign(this.config, config)
  }
}

Attache.use = use

Attache.install = install
