
const CONFIG = {
  loading: false,
  // data: object, function, promise
  // url: string, function, promise
  // trigger: ''
  // filters: []
}

export default class Config {
  constructor(config) {
    this.config = Object.create(CONFIG)
    Object.assign(this.config, config)
  }

  setup(component) {
    const { trigger } = this.config
    // component[trigger]
  }
}
