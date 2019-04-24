"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _install = require("./install");

var _config = _interopRequireWildcard(require("./net/config"));

var _ApiAttache = _interopRequireDefault(require("./net/ApiAttache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Attache {
  constructor(_ref) {
    let configs = _ref.configs,
        config = _ref.config;
    this.configs = configs;
    this.config = Object.assign(Object.create(_config.default), config);
    this.attaches = [];
  }

  setConfigs(configs) {
    // TODO 清理attaches
    this.configs = configs;
  }

  setup(component) {
    if (!this.configs) return;
    this.configs.forEach(cfg => {
      const config = Object.assign(Object.create(this.config), cfg);
      const attache = new _ApiAttache.default(config);
      attache.setup(component);
      this.attaches.push(attache);
    });
  }

  use(config) {
    Object.assign(this.config, config);
  }

}

exports.default = Attache;
Attache.use = _config.use;
Attache.install = _install.install;