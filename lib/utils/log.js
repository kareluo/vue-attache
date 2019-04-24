"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.error = error;
exports.i = i;
exports.e = e;

/* eslint-disable */
function log() {
  console.log(...arguments);
}

function error() {
  console.error(...arguments);
}

function i() {
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }

  console.log('[api-attache]', ...messages);
}

function e() {
  for (var _len2 = arguments.length, errors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    errors[_key2] = arguments[_key2];
  }

  console.error('[api-attache]', ...errors);
}