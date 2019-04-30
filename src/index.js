#!/usr/bin/env node

const fs = require('fs');
const babel = require('babel-core');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');

const fileName = './captive-app/src/App.js';
const inputCode = fs.readFileSync(fileName, 'utf8');

const ast = babylon.parse(inputCode, {
  sourceType: 'module',
  plugins: ['jsx'],
});

traverse(ast, {
  enter(path) {
    if (path.isJSXText()) {
    // if (path.isLiteral()) {
      const trimmedValue = path.node.value.trim();
      if (!trimmedValue.length) return;
      path.node.value = path.node.value.replace(trimmedValue, '{t(k.SOME_TEXT)}');
    }
  },
});

const { code } = babel.transformFromAst(ast, inputCode);

// console.log(code);

fs.writeFileSync('./scratchpad/output.js', code);
