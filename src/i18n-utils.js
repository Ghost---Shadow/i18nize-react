const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');

const {
  LutManager,
  lutToLanguageCodeHelper,
  randomChineseLutConverter,
} = require('./lut');

// TODO: Generate these files with babel too
const generateI18nFiles = (outputDir) => {
  mkdirp.sync(path.join(outputDir, 'src', 'i18n'));
  fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'keys.js'), `module.exports = ${JSON.stringify(LutManager.getKeys(), null, 2)}`);
  const initJsPath = path.resolve(path.join(__dirname, '../i18n-static/init.js'));
  fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'init.js'), fs.readFileSync(initJsPath));

  const englishLut = LutManager.getLut();
  fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'english.js'), lutToLanguageCodeHelper(englishLut));
  const chineseLut = randomChineseLutConverter(LutManager.getLut());
  fs.writeFileSync(path.join(outputDir, 'src', 'i18n', 'chinese.js'), lutToLanguageCodeHelper(chineseLut));
};

module.exports = {
  generateI18nFiles,
};
