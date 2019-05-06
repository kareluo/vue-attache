#!/usr/bin/env node

const fs = require('fs')
const SwaggerV2 = require('./lib/SwaggerV2')
const util = require('./lib/util')
const prettier = require("prettier");

const env = {}
const argvs = process.argv

while (argvs.length > 0) {
  const argv = argvs.shift()
  switch (argv) {
    case '--output-file':
      env.outputFile = argvs.shift()
      break
    case '--swagger-base-url':
      env.swaggerBaseUrl = argvs.shift()
      break
    case '--swagger-json-file':
      env.swaggerJsonFile = argvs.shift()
      break
    case '--config-file':
      env.configFile = argvs.shift()
      break
    case '-h':
    case '--help':
      break
  }
}

async function saveSwaggerApi2Configs (api, options) {
  const swaggerV2 = new SwaggerV2(api, options)
  const configs = swaggerV2.configs()
  if (env.outputFile) {
    const content = prettier.format(configs.replace(/anonymous/g, ''), {
      semi: false,
      parser: "babel"
    });
    fs.writeFileSync(env.outputFile, content)
  }
}

async function fetchSwaggerApis2Configs (baseUrl, options) {
  const apis = util.fetchSwaggerApis(baseUrl)
  while (true) {
    const api = await apis.next()
    const { value, done } = api
    if (value) {
      await saveSwaggerApi2Configs(value, options)
    }
    if (done) break
  }
}

const options = require(env.configFile || './vue-attache.config.js')
env.swaggerBaseUrl = env.swaggerBaseUrl || options.swaggerBaseUrl
env.swaggerJsonFile = env.swaggerJsonFile || options.swaggerJsonFile
env.outputFile = env.outputFile || options.outputFile

if (env.swaggerBaseUrl) {
  fetchSwaggerApis2Configs(env.swaggerBaseUrl, options)
} else if (env.swaggerJsonFile) {
  const data = fs.readFileSync(env.swaggerJsonFile)
  saveSwaggerApi2Configs(JSON.parse(data), options)
}
