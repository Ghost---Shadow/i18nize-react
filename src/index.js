#!/usr/bin/env node

const fs = require('fs');
const babel = require('babel-core');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');

const myPlugin = require('./plugin');

const { LutManager } = require('./lut');

const fileName = './test/fixtures/first-test/code.js';
const inputCode = fs.readFileSync(fileName, 'utf8');

const ast = babylon.parse(inputCode, {
  sourceType: 'module',
  plugins: ['jsx'],
});

traverse(ast, myPlugin(babel).visitor);

const { code } = babel.transformFromAst(ast);

// console.log(code);

fs.writeFileSync('./scratchpad/output.js', code);
fs.writeFileSync('./scratchpad/english.json', JSON.stringify(LutManager.getLut(), null, 2));
