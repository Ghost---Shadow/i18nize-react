const fs = require('fs');
const babel = require('babel-core');
const babylon = require('babylon');

const fileName = './captive-app/src/App.js';
const inputCode = fs.readFileSync(fileName, 'utf8');

const ast = babylon.parse(inputCode, {
  sourceType: 'module',
  plugins: ['jsx'],
});

console.log(ast);

const { code } = babel.transformFromAst(ast, inputCode);

console.log(code);
