import orderBy from 'lodash.orderby';

import SplitService from '../services/split';

import { loadInput, formatOutput } from '../utils/csv/csv';
import asyncQueue from '../utils/helper/asyncQueue';

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
    await SplitService.init(opts);

    // Loading input file
    const inputData = await loadInput(opts);

    // Processing the data
    const queue = inputData.map((item, index) => async () => {
      const part = await SplitService.split(inputData[index], opts);
      if (!part) return; // Filtering empty results
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
