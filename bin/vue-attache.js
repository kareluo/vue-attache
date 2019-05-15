#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .usage('<command> [options]');

program
  .option('--config-file <path>', 'Vue Attache config file');

program
  .command('generate')
  .description('generate vue attache config')
  .action(require('./vue-attache-generate'))
  .option('--swagger-json-file <path>', 'Swagger json file')
  .option('--swagger-base-url <url>', 'Swagger base url')
  .option('--output-file <path>', 'Vue Attache output js file');

program.parse(process.argv);