const { create } = require('babel-test');
const path = require('path');
const { toMatchFile } = require('jest-file-snapshot');

const plugin = require('../src/plugin');
const { LutManager } = require('../src/lut');
const { parserPlugins, generatorOptions } = require('../src/used-plugins');

expect.extend({ toMatchFile });
const { fixtures } = create({
  plugins: [plugin],
  parserOpts: {
    plugins: parserPlugins,
  },
  generatorOpts: generatorOptions,
});

fixtures('i18ize', path.join(__dirname, 'fixtures'), {
  beforeEach() {
    LutManager.clearLut();
  },
});
