const { create } = require('babel-test');
const path = require('path');
const plugin = require('../src/plugin');
const { parserPlugins, generatorOptions } = require('../src/used-plugins');
const { toMatchFile } = require('jest-file-snapshot');

expect.extend({ toMatchFile });
const { fixtures } = create({
  plugins: [plugin],
  parserOpts: {
    plugins: parserPlugins,
  },
  generatorOpts: generatorOptions,
});

fixtures('i18ize', path.join(__dirname, 'fixtures'));
