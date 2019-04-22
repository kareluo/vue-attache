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
  }
}

if (env.jsonFile) {
  const data = fs.readFileSync(env.jsonFile)
  const swaggerV2 = new SwaggerV2(data)
  const configs = swaggerV2.configs()
  console.log(configs)
}
