const parserPlugins = [
  'jsx',
  'classProperties', // '@babel/plugin-proposal-class-properties',
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
