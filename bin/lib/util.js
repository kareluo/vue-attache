const request = require('request');

module.exports.log = function (...messages) {
  // Debuging
  // console.log(...messages)
}

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

function fetchSwaggerApiDocs (host) {
  const url = `${host}/swagger-resources`
  return new Promise((resolve, reject) => {
    request({ url, method: 'get' }, (err, res, body) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}

function fetchSwaggerApi (host, doc) {
  const url = `${host}/${doc.location}`
  return new Promise((resolve, reject) => {
    request({ url, method: 'get' }, (err, res, body) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}

module.exports.fetchSwaggerApis = async function* (host) {
  host = host.replace(/\/$/, '')
  try {
    const docs = await fetchSwaggerApiDocs(host)
    if (docs && docs.length > 0) {
      yield* docs.map(async (doc) => {
        return await fetchSwaggerApi(host, doc)
      })
    }
  } catch (e) {
    console.error(e)
  }
}