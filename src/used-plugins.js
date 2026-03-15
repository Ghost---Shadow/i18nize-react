const parserPlugins = [
  'jsx',
  'classProperties', // '@babel/plugin-transform-class-properties',
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
