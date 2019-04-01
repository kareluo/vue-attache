import { install } from './install'
import ApiAttache from './net/ApiAttache'
import Fetcher, { fetcher as defaultFetcher } from './net/Fetcher';

export default class Attache {
  
  constructor({ attaches, fetcher }) {
    this.configs = []
    this.attaches = attaches
    this.fetcher = fetcher || defaultFetcher
  }

  setAttaches(attaches) {
    // TODO 清理attaches
    this.attaches = attaches
  }

  setup(component) {
    if (!this.attaches) return
    this.attaches.forEach(attache => {
      const config = new ApiAttache(attache)
      config.setup(component)
      this.configs.push(config)
    })
  }

  fetch(request) {
    return this.fetcher.fetch(request)
  }

  use(methods) {
    this.fetcher.use(methods)
  }
}

Attache.fetch = fetch

Attache.install = install

Attache.use = Fetcher.use
