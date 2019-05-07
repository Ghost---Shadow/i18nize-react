const {
  i18nextImportStatement,
  kImportStatement,
} = require('./frozen-asts');

const {
  getUniqueKeyFromFreeText,
} = require('./lut');

const extractValueAndUpdateTable = (t, table, path, key) => {
  const { value } = path.node;

  if (t.isStringLiteral(path.node)) {
    if (!table[key]) table[key] = {};
    table[key].value = value;
    table[key].path = path;
  }
};

module.exports = ({ types: t }) => ({
  name: 'i18ize-react',
  visitor: {
    Program: {
      enter() {
        this.state = {};
      },
      exit(path) {
        Object.keys(this.state).forEach((key) => {
          if (this.state[key].valid) {
            // TODO: OPTIMIZATION: Use quasi quotes to optimize this
            const kValue = getUniqueKeyFromFreeText(this.state[key].value);
            this.state[key].path.replaceWithSourceString(`i18n.t(k.${kValue})`);
          }
        });
        path.node.body.unshift(kImportStatement);
        path.node.body.unshift(i18nextImportStatement);
      },
    },
    JSXExpressionContainer: {
      enter(path) {
        const key = path.node.expression.name;
        if (t.isIdentifier(path.node.expression) && this.state[key]) {
          this.state[key].valid = true;
        }
      },
    },
    AssignmentExpression: {
      enter(path) {
        const key = path.node.left.property.name;
        extractValueAndUpdateTable(t, this.state, path.get('right'), key);
      },
    },
    ObjectProperty: {
      enter(path) {
        const key = path.node.key.name;
        extractValueAndUpdateTable(t, this.state, path.get('value'), key);
      },
    },
    VariableDeclarator: {
      enter(path) {
        const key = path.node.id.name;
        extractValueAndUpdateTable(t, this.state, path.get('init'), key);
      },
    },
    JSXText: {
      enter(path) {
        const coreValue = path.node.value.trim();
        if (!coreValue.length) return;
        const kValue = getUniqueKeyFromFreeText(coreValue);
        // TODO: OPTIMIZATION: Use quasi quotes to optimize this
        path.node.value = path.node.value.replace(coreValue, `{i18n.t(k.${kValue})}`);
      },
    },
  },
});
