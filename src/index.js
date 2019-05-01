#!/usr/bin/env node

const fs = require('fs');
const babel = require('babel-core');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');

const myPlugin = require('./plugin');

const fileName = './captive-app/src/App.js';
const inputCode = fs.readFileSync(fileName, 'utf8');

const ast = babylon.parse(inputCode, {
  sourceType: 'module',
  plugins: ['jsx'],
});

traverse(ast, myPlugin().visitor);

const { code } = babel.transformFromAst(ast);

// console.log(code);

fs.writeFileSync('./scratchpad/output.js', code);
