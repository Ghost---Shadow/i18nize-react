const randChinese = require('randchinese');

const MAX_ITERATIONS = 1000;

let lut = {};

const DEFAULT_MAX_LENGTH = 30;
let maxLength = DEFAULT_MAX_LENGTH;

const lutToLanguageCodeHelper = (myLut) => {
  const kvToCode = (key, value) => `  [k.${key}]: '${value}'`;
  const lines = Object.keys(myLut).map(key => kvToCode(key, myLut[key])).join(',\n');
  const template = `const k = require('./keys');\n\nmodule.exports = {\n${lines}\n};\n`;

  return template;
};

const randomChineseLutConverter = myLut => Object.keys(myLut)
  .reduce((acc, next) => ({
    ...acc,
    [next]:
   randChinese(myLut[next].length),
  }), {});

const LutManager = {
  getLut: () => lut,
  setLut: (newLut) => { lut = newLut; },
  getKeys: () => Object.keys(lut).reduce((acc, next) => ({ ...acc, [next]: next }), {}),

  resetGetUniqueKeyFromFreeTextNumCalls: () => { LutManager.getUniqueKeyFromFreeTextNumCalls = 0; },
  incrementGetUniqueKeyFromFreeTextNumCalls: () => {
    LutManager.getUniqueKeyFromFreeTextNumCalls += 1;
  },

  // For testing
  clearLut: () => { lut = {}; },
  setMaxLength: (ml) => { maxLength = ml; },
  clearMaxLength: () => { maxLength = DEFAULT_MAX_LENGTH; },
};

const getUniqueKeyFromFreeText = (text) => {
  LutManager.incrementGetUniqueKeyFromFreeTextNumCalls();

  let maybeDuplicateKey = text.toUpperCase()
    .slice(0, maxLength)
    .replace(/[^a-zA-Z]+/g, ' ')
    .trim()
    .replace(/[^a-zA-Z]/g, '_');
  maybeDuplicateKey = maybeDuplicateKey.length ? maybeDuplicateKey : '_';
  let key = maybeDuplicateKey;
  for (let i = 1; i < MAX_ITERATIONS; i += 1) {
    if (lut[key] === text || lut[key] === undefined) break;
    key = `${maybeDuplicateKey}${i}`;
  }
  lut[key] = text;

  return key;
};

module.exports = {
  getUniqueKeyFromFreeText,
  LutManager,
  lutToLanguageCodeHelper,
  randomChineseLutConverter,
};
