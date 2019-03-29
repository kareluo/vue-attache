import { install } from './install'
import ApiAttacheConfig from './net/config'
import Fetcher, { fetcher as defaultFetcher } from './net/fetcher';

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
      const config = new ApiAttacheConfig(attache)
      config.setup(component)
      this.configs.push(config)
    })
  }

  fetch(request) {
    console.log('attache fetch', request)
    return this.fetcher.fetch(request)
  }
}

Attache.fetch = fetch

Attache.install = install

Attache.fetcher = Fetcher.use
