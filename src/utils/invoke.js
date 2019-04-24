import { isFunction } from './util'

export async function apply(that, method, args) {
  if (isFunction(method)) {
    return await method.apply(that, args)
  }
  return method
}

export async function invoke(that, method, ...args) {
  if (isFunction(method)) {
    return await method.call(that, ...args)
  }
  return method
}
