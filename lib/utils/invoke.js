"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = apply;
exports.invoke = invoke;

var _util = require("./util");

async function apply(that, method, args) {
  if ((0, _util.isFunction)(method)) {
    return await method.apply(that, args);
  }

  return method;
}

async function invoke(that, method) {
  if ((0, _util.isFunction)(method)) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return await method.call(that, ...args);
  }

  return method;
}