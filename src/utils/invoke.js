
export async function apply(that, method, args) {
  let result = method
  // eslint-disable-next-line
  while(true) {
    if (typeof result === 'function') {
      result = result.apply(that, args)
    } else if (result instanceof Promise) {
      result = await result
    } else break
  }
  return result
}

export async function invoke(that, method, ...args) {
  let result = method
  // eslint-disable-next-line
  while(true) {
    if (typeof result === 'function') {
      result = result.call(that, ...args)
      // eslint-disable-next-line
    } else if (result instanceof Promise) {
      result = await result
    } else break
  }
  // eslint-disable-next-line
  return result
}
