const { create } = require('babel-test');
const path = require('path');
const plugin = require('../src/plugin');
const plugins = require('../src/used-plugins');
const { toMatchFile } = require('jest-file-snapshot');

expect.extend({ toMatchFile });
const { fixtures } = create({
  plugins: [plugin],
  parserOpts: {
    plugins,
  },
});

fixtures('i18ize', path.join(__dirname, 'fixtures'));
