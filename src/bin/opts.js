const opts = (argv) => {
  // const country = argv._[0] || undefined;
  const input = argv._[0];
  const output = argv._[1];
  const model = argv.model || argv.m;
  const sentence = argv.sentence || argv.s;
  const token = argv.token || argv.t;
  const constituent = argv.constituent || argv.c;

  return {
    input,
    output,
    model,
    sentence,
    token,
    constituent,
  };
};

module.exports = opts;
export default opts;
