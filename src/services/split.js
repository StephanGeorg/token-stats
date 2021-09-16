import nnsplit from 'nnsplit';

let splitter;

export default {

  // Initialization
  async init({ model = '' }) {
    splitter = await nnsplit.NNSplit.new(model);
    return splitter;
  },

  // Main process
  async split(input = '', options = {}) {
    const opts = {
      sentence: options.sentence || 0,
      token: options.token,
      constituent: options.constituent,
    };

    const splits = (await splitter.split([input]))[0];

    // Extracting the desired sentence
    const sentencePosition = opts.sentence === -1
      ? splits.parts.length - 1 // last
      : Number(opts.sentence);
    if (!splits.parts[sentencePosition]) return null;
    const sentence = splits.parts[sentencePosition];
    if (!opts.token) return sentence.text;

    // Extracting the desired token
    const tokenPosition = opts.token === -1
      ? sentence.parts.length - 1 // last
      : Number(opts.token);
    if (!sentence.parts[tokenPosition]) return null;
    const token = sentence.parts[tokenPosition].parts[0];
    if (!opts.constituent) return token.text;

    // Extracting the desired constituent
    const constituentPosition = opts.constituent === -1
      ? token.parts.length - 1 // last
      : Number(opts.constituent);
    const constituent = token.parts[constituentPosition];

    return constituent;
  },
};
