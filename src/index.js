#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const babel = require('babel-core');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');

const myPlugin = require('./plugin');

const { LutManager } = require('./lut');
const { walk } = require('./walker');

const inputDir = process.argv[2] || '../captive-app';
const outputDir = process.argv[3] || './scratchpad';

const transformFile = (fileName) => {
  const inputCode = fs.readFileSync(fileName, 'utf8');

  const ast = babylon.parse(inputCode, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  traverse(ast, myPlugin(babel).visitor);

  const { code } = babel.transformFromAst(ast);

  const relativePath = path.relative(inputDir, fileName);
  const outputFilePath = path.join(outputDir, relativePath);
  mkdirp.sync(path.dirname(outputFilePath));
  fs.writeFileSync(outputFilePath, code);
};

const allFiles = walk(path.resolve(inputDir));

allFiles.forEach(fileName => transformFile(fileName));

fs.writeFileSync(path.join(outputDir, 'english.json'), JSON.stringify(LutManager.getLut(), null, 2));

// npm start ..\captive-app .\scratchpad
