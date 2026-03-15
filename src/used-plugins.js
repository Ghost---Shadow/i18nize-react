const parserPlugins = [
  'jsx',
  'classProperties',
  'flow',
];

const generatorOptions = {
  retainLines: true,
  retainFunctionParens: true,
};

module.exports = {
  parserPlugins,
  generatorOptions,
};
