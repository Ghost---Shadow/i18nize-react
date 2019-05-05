const { create } = require('babel-test');
const path = require('path');
const plugin = require('../src/plugin');
const { toMatchFile } = require('jest-file-snapshot');

expect.extend({ toMatchFile });
const { fixtures } = create({
  plugins: [plugin],
  parserOpts: {
    plugins: ['jsx'],
  },
});

fixtures('i18ize', path.join(__dirname, 'fixtures'));
