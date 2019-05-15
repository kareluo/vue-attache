
const fs = require('fs');
const SwaggerV2 = require('./lib/SwaggerV2');
const util = require('./lib/util');
const prettier = require("prettier");

async function saveSwaggerApi2Configs (api, config) {
  const swaggerV2 = new SwaggerV2(api, config)
  const configs = swaggerV2.configs()
  if (env.outputFile) {
    const content = prettier.format(configs.replace(/anonymous/g, ''), {
      semi: false,
      parser: "babel"
    });
    fs.writeFileSync(env.outputFile, content)
  }
}

async function fetchSwaggerApis2Configs (baseUrl, config) {
  const apis = util.fetchSwaggerApis(baseUrl)
  while (true) {
    const api = await apis.next()
    const { value, done } = api
    if (value) {
      await saveSwaggerApi2Configs(value, config)
    }
    if (done) break
  }
}

const main = (args) => {
  console.log(args)
  const config = require(args.configFile || './vue-attache.config.js')
  const swaggerBaseUrl = args.swaggerBaseUrl || config.swaggerBaseUrl;
  const swaggerJsonFile = args.swaggerJsonFile || config.swaggerJsonFile

  if (swaggerJsonFile) {
    const data = fs.readFileSync(env.swaggerJsonFile)
    saveSwaggerApi2Configs(JSON.parse(data), config)
  } else if (swaggerBaseUrl) {
    fetchSwaggerApis2Configs(env.swaggerBaseUrl, config)
  }
}

exports = module.exports = main;
