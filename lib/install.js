"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      this._attache = new _index.default({});
      const configs = this.$options.configs;

      if (configs && Array.isArray(configs)) {
        this._attache.setConfigs(configs);
      }
    },

    created() {
      this._attache.setup(this);
    }

  });
  Object.defineProperty(Vue.prototype, '$attache', {
    get() {
      return this._attache;
    }

  });
}