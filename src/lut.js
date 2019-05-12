const randChinese = require('randchinese');

const MAX_ITERATIONS = 1000;

let lut = {};

const DEFAULT_MAX_LENGTH = 30;
let maxLength = DEFAULT_MAX_LENGTH;

const lutToLanguageCodeHelper = (myLut) => {
  const kvToCode = (key, value) => `  [k.${key}]: '${value}'`;
  const lines = Object.keys(myLut).map(key => kvToCode(key, myLut[key])).join(',\n');
  const template = `import k from './keys';\n\nexport default {\n${lines}\n};\n`;

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
  getKeys: () => Object.keys(lut).reduce((acc, next) => ({ ...acc, [next]: next }), {}),

  resetGetUniqueKeyFromFreeTextNumCalls: () => { LutManager.getUniqueKeyFromFreeTextNumCalls = 0; },
  incrementGetUniqueKeyFromFreeTextNumCalls: () => {
    LutManager.getUniqueKeyFromFreeTextNumCalls += 1;
  },

  // For testing
  clearLut: () => { lut = {}; },
  setLut: (newLut) => { lut = newLut; },
  setMaxLength: (ml) => { maxLength = ml; },
  clearMaxLength: () => { maxLength = DEFAULT_MAX_LENGTH; },
};

const getUniqueKeyFromFreeText = (text) => {
  LutManager.incrementGetUniqueKeyFromFreeTextNumCalls();

  const maybeDuplicateKey = text.toUpperCase()
    .slice(0, maxLength)
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/\W/g, '_');
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
