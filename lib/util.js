

module.exports.isFunction = function (func) {
  return typeof func === 'function'
}

module.exports.trimFunction = function (func, preSpace = '  ') {
  let funcStr = func
  if (typeof func !== 'string') {
    funcStr = func.toString()
  }
  const sentences = funcStr.split('\n')
  const len = sentences.reduce((len, value) => {
    const ms = value.match(/^ */)
    if (ms && ms.length > 0) {
      if (ms[0].length !== 0) {
        return Math.min(ms[0].length, len)
      }
    }
    return len
  }, Number.MAX_SAFE_INTEGER)
  const re = new RegExp(`^ {${len}}`)
  return sentences.map(sentence => {
    return sentence.replace(re, preSpace)
  }).join('\n')
}
