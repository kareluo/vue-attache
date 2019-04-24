#!/usr/bin/env node

const fs = require('fs')
const SwaggerV2 = require('../lib/SwaggerV2')

const env = {}
const argvs = process.argv

while (argvs.length > 0) {
  const argv = argvs.shift()
  switch (argv) {
    case '--json-file':
      env.jsonFile = argvs.shift()
      break
    case '--out-file':
      env.outFile = argvs.shift()
      break
  }
}

if (env.jsonFile) {
  const data = fs.readFileSync(env.jsonFile)
  const swaggerV2 = new SwaggerV2(data)
  const configs = swaggerV2.configs()

  if (env.outFile) {
    fs.writeFileSync(env.outFile, configs)
  }
}

// vue-attache --json-file /Users/felix/Workshop/work/vue-attache/examples/swagger-api.json --out-file /Users/felix/Workshop/work/vue-attache/examples/src/dev/net/configs.js