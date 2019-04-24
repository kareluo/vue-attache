"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _log = require("../utils/log");

var _invoke = require("../utils/invoke");

class ApiAttache {
  constructor(config) {
    this.config = config;
  }

  setup(component) {
    this.component = component;
    const trigger = this.config.trigger;

    if (trigger && typeof trigger === 'string') {
      const trig = ApiAttache.prototype.trig;
      const fn = component[trigger];
      const that = this;

      component[trigger] = async function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (0, _invoke.apply)(that, trig, [component].concat(args));

        if (fn) {
          fn.apply(component, args);
        }
      };
    }
  }

  async trig() {
    let component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.component;
    const debug = this.config.debug;

    try {
      if (debug) {
        (0, _log.i)('begin:', component);
      }

      if (this.config.begin) {
        if (debug) {
          (0, _log.i)('begin-call');
        }

        await (0, _invoke.invoke)(component, this.config.begin);
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (debug) {
        (0, _log.i)('before-fetch:', args);
      }

      const a = await this.beforeFetch({
        component,
        args
      });

      if (debug) {
        (0, _log.i)('fetch:', a.url, a.data);
      }

      const b = await this.fetch(a);

      if (debug) {
        (0, _log.i)('after-fetch:', b.response);
      }

      await this.afterFetch(b);
    } catch (e) {
      this.error(e);
    }

    if (debug) {
      (0, _log.i)('end');
    }

    if (this.config.end) {
      if (debug) {
        (0, _log.i)('end-call');
      }

      await (0, _invoke.invoke)(component, this.config.end);
    }
  }

  async beforeFetch(_ref) {
    let _ref$component = _ref.component,
        component = _ref$component === void 0 ? this.component : _ref$component,
        args = _ref.args;
    const result = {
      component
    };
    const _this$config = this.config,
          url = _this$config.url,
          param = _this$config.param,
          query = _this$config.query,
          body = _this$config.body,
          header = _this$config.header;

    if (url) {
      result.url = await (0, _invoke.apply)(component, url, args);
    }

    if (param) {
      result.param = await (0, _invoke.apply)(component, param, args);
      const url = result.url;
      const reg = /\{([A-Za-z_]\w*)\}/g;
      const matches = [];
      let match = reg.exec(url);

      while (match) {
        matches.push(match);
        match = reg.exec(url);
      }

      if (matches.length > 0) {
        result.url = matches.reduce((u, m) => {
          return u.replace(m[0], result.param[m[1]]);
        }, url);
      }
    }

    if (query) {
      result.query = await (0, _invoke.apply)(component, query, args);
    }

    if (body) {
      result.body = await (0, _invoke.apply)(component, body, args);
    }

    if (header) {
      result.header = await (0, _invoke.apply)(component, header, args);
    }

    return result;
  }

  async fetch(_ref2) {
    let _ref2$component = _ref2.component,
        component = _ref2$component === void 0 ? this.component : _ref2$component,
        url = _ref2.url,
        param = _ref2.param,
        query = _ref2.query,
        body = _ref2.body,
        header = _ref2.header;
    const fetch = this.config.fetch;
    const request = {
      url,
      param,
      query,
      body,
      header,
      method: this.config.method
    };

    if (this.config.debug) {
      (0, _log.i)('fetch-request:', request);
    }

    const response = await (0, _invoke.invoke)(component, fetch, request);
    return {
      component,
      response
    };
  }

  async afterFetch(_ref3) {
    let _ref3$component = _ref3.component,
        component = _ref3$component === void 0 ? this.component : _ref3$component,
        response = _ref3.response;
    const config = this.config;

    const _ref4 = await (0, _invoke.invoke)(component, config.response, response),
          success = _ref4.success,
          data = _ref4.data;

    if (!success) {
      throw response;
    }

    const _ref5 = await (0, _invoke.invoke)(component, config.result, data),
          succ = _ref5.success,
          dat = _ref5.data;

    if (succ) {
      await (0, _invoke.invoke)(component, config.success, dat);
    } else {
      await (0, _invoke.invoke)(component, config.failure, dat);
    }

    if (config.debug) {
      (0, _log.i)('after-fetch-data:', dat);
    }

    if (dat) {
      const dataname = config.dataname,
            datanames = config.datanames;

      if (dataname) {
        if (config.debug) {
          (0, _log.i)('after-fetch-dataname:', "".concat(dataname, " <-"), dat);
        }

        component[dataname] = dat;
      }

      if (datanames && Array.isArray(datanames)) {
        if (config.debug) {
          datanames.forEach(name => {
            if (typeof name === 'object') {
              (0, _log.i)('after-fetch-datanames:', "".concat(name.key, " <-"), dat[name.value]);
              component[name.key] = dat[name.value];
            } else {
              (0, _log.i)('after-fetch-datanames:', "".concat(name, " <-"), dat[name]);
              component[name] = dat[name];
            }
          });
        } else {
          datanames.forEach(name => {
            if (typeof name === 'object') {
              component[name.key] = dat[name.value];
            } else {
              component[name] = dat[name];
            }
          });
        }
      }
    }
  }

  error(exception) {
    if (this.config.debug) {
      (0, _log.e)(exception);
    }

    this.config.error(exception);
  }

}

exports.default = ApiAttache;