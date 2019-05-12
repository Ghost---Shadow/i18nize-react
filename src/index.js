#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const babel = require('babel-core');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');
const { default: relativeImportPlugin } = require('babel-project-relative-import');

const myPlugin = require('./plugin');
const { walk } = require('./walker');
const { generateI18nFiles } = require('./i18n-utils');
const { LutManager } = require('./lut');

const inputDir = process.argv[2] || '../captive-app';
const outputDir = process.argv[3] || '../captive-app';

const transformFile = (fileName) => {
  console.log('Transforming:', fileName);
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

// If running this script for the second time, it should not
// discard the table generated from the first run
if (fs.existsSync(path.join(path.resolve(inputDir), 'src/i18n/english.js'))) {
  console.log('english.js exists');
  // eslint-disable-next-line
  const oldLut = require(path.join(path.resolve(inputDir), 'src/i18n/english'));
  LutManager.setLut(oldLut);
}

const allFiles = walk(path.resolve(inputDir));

allFiles.forEach(fileName => transformFile(fileName));

generateI18nFiles(outputDir);

// npm start ../input-directory ../output-directory
