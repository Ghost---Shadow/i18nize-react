const pluginTester = require('babel-plugin-tester');
const path = require('path');
const plugin = require('../src/plugin');

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    parserOpts: {
      plugins: ['jsx'],
    },
  },
});
