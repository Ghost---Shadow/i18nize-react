const fs = require('fs');
const acorn = require('acorn-jsx-walk');

const walk = acorn.default;

const fileName = './captive-app/src/App.js';

const file = fs.readFileSync(fileName, 'utf8');

const strings = [];

walk(file, {
  Literal({ value }) {
    strings.push(value.trim());
  },
});

const ENGLISH = strings.reduce((acc, item, i) => {
  acc[`TEXT${i + 1}`] = item;
  return acc;
}, {});

console.log(JSON.stringify({ ENGLISH }, null, 2));
