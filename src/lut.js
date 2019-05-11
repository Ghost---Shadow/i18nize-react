const MAX_ITERATIONS = 1000;

let lut = {};

const DEFAULT_MAX_LENGTH = 30;
let maxLength = DEFAULT_MAX_LENGTH;

const LutManager = {
  getLut: () => lut,

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
};
