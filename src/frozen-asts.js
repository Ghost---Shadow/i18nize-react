const babylon = require('@babel/parser');

// TODO: Use line numbers to move the two imports to separate lines
const i18nextImportStatement = babylon.parse('import i18n from \'i18next\';\n', { sourceType: 'module' }).program.body[0];
const kImportStatement = babylon.parse('import k from \'~/i18n/keys\';\n', { sourceType: 'module' }).program.body[0];

module.exports = {
  i18nextImportStatement,
  kImportStatement,
};
