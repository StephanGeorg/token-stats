import nnsplit from 'nnsplit';
import orderBy from 'lodash.orderby';

import { loadInput, formatOutput } from '../utils/csv/csv';
import asyncQueue from '../utils/helper/asyncQueue';

let splitter;

// Initialization
const init = async ({ model = '' }) => {
  splitter = await nnsplit.NNSplit.new(model);
  return splitter;
};

// Main process
const split = async (input = '', options = {}) => {
  const opts = {
    sentence: options.sentence || -1,
    token: options.token || -1,
    constituent: options.constituent || -1,
  };

  const splits = await splitter.split([input]);

  // Extracting the desired sentence
  const sentencePosition = opts.sentence === -1
    ? splits[0].parts.length - 1 // last
    : Number(opts.sentence);
  const sentence = splits[0].parts[sentencePosition];

  // Extracting the desired token
  const tokenPosition = opts.token === -1
    ? sentence.parts.length - 1 // last
    : Number(opts.token);
  const token = sentence.parts[tokenPosition].parts[0];

  // Extracting the desired constituent
  const constituentPosition = opts.constituent === -1
    ? token.parts.length - 1 // last
    : Number(opts.constituent);
  const constituent = token.parts[constituentPosition];

  return constituent;
};

export default {
  /**
   * Batch processing
   * @param {*} opts
   * @returns
   */
  async run(opts = {}) {
    const data = [];
    const stats = [];

    // Initializing dependencies
    await init(opts);

    // Loading input file
    const inputData = await loadInput(opts);

    // Processing the data
    const queue = inputData.map((item, index) => async () => {
      const part = await split(inputData[index], opts);
      const position = data.indexOf(part.toLowerCase());

      if (position === -1) {
        data.push(part.toLowerCase());
        stats.push(1);
      } else stats[position]++;
    });
    await asyncQueue(queue);

    // Merging the data
    const result = data.map((item, i) => (
      {
        name: item,
        count: stats[i],
      }
    ));

    // Sorting and filtering the result
    const sortedResult = orderBy(result, ['count'], ['desc']); // ordering by count
    const finalResult = sortedResult.filter((item) => item.count > 1); // removing single values

    // Formatting the output
    await formatOutput(finalResult, opts);
    process.exit();
  },
};
