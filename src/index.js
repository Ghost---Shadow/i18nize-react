#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const babel = require('babel-core');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');

const { default: relativeImportPlugin } = require('babel-project-relative-import');

const myPlugin = require('./plugin');

const { LutManager } = require('./lut');
const { walk } = require('./walker');

const inputDir = process.argv[2] || '../captive-app';
const outputDir = process.argv[3] || '../captive-app';

const transformFile = (fileName) => {
  const inputCode = fs.readFileSync(fileName, 'utf8');

  const ast = babylon.parse(inputCode, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  traverse(ast, myPlugin(babel).visitor);

  // Convert all the ~/i18n/keys to <workplace_dir>/src/i18n/keys
  const state = {
    file: {
      opts: {
        sourceRoot: path.resolve(inputDir),
        filename: fileName,
      },
    },
    opts: {
      sourceDir: 'src', // Default in React projects
    },
  };
  traverse(ast, relativeImportPlugin(babel).visitor, null, state);

  const { code } = babel.transformFromAst(ast);

  const relativePath = path.relative(inputDir, fileName);
  const outputFilePath = path.join(outputDir, relativePath);
  mkdirp.sync(path.dirname(outputFilePath));
  fs.writeFileSync(outputFilePath, code);
};

const allFiles = walk(path.resolve(inputDir));

allFiles.forEach(fileName => transformFile(fileName));

// TODO: Generate these files with babel too
mkdirp.sync(path.join(outputDir, 'src', 'i18n'));
fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'keys.js'), `export default ${JSON.stringify(LutManager.getKeys(), null, 2)}`);
fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'english.js'), LutManager.lutToLanguageCode());
fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'init.js'), fs.readFileSync('./i18n-static/init.js'));

// npm start ..\captive-app .\scratchpad
