const opts = (argv) => {
  // const country = argv._[0] || undefined;
  const input = argv._[0];
  const output = argv._[1];
  const model = argv.model || argv.m;

  return {
    input,
    output,
    model,
  };
};

module.exports = opts;
export default opts;
