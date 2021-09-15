#!/usr/bin/env node
import minimist from 'minimist';

import cliController from '../controllers/cli';

const optionDefinitions = {};

const argv = minimist(process.argv.slice(2), optionDefinitions);
const options = require('./opts')(argv);

const main = async (opts = {}) => {
  console.log({ opts });
  return cliController.run(opts);
  /* switch (mode) {
    case 'geocode': return cliController.geocode(opts);
    case 'normalize': return cliController.normalize(opts);
    case 'ambiguous': return cliController.ambiguous(opts);
    case 'analyze':
    default: return cliController.analyze(opts);
  } */
};

main(options)
  .then((data) => {
    console.log({ data });
    process.exit(0);
  })
  .catch((error) => {
    console.error({ error });
    process.exit(1);
  });
