/* eslint-disable */

export function log(...messages) {
  console.log(...messages);
}

export function error(...errors) {
  console.error(...errors);
}

export function i(...messages) {
  console.log('[api-attache]', ...messages);
}

export function e(...errors) {
  console.error('[api-attache]', ...errors);
}
