const _ = require('lodash');

const {
  i18nextImportStatement,
  kImportStatement,
} = require('./frozen-asts');

const {
  getUniqueKeyFromFreeText,
  LutManager,
} = require('./lut');

const extractValueAndUpdateTable = (t, table, path, key) => {
  const { value } = path.node;

  if (t.isStringLiteral(path.node)) {
    table[key] = _.merge(table[key], { path, value });
  }
};

module.exports = ({ types: t }) => ({
  name: 'i18ize-react',
  visitor: {
    Program: {
      enter() {
        this.state = {};
        this.alreadyImportedK = false;
        this.alreadyImportedi18n = false;
        LutManager.resetGetUniqueKeyFromFreeTextNumCalls();
      },
      exit(path) {
        Object.keys(this.state).forEach((key) => {
          if (this.state[key].valid && this.state[key].value && this.state[key].path) {
            // TODO: OPTIMIZATION: Use quasi quotes to optimize this
            const kValue = getUniqueKeyFromFreeText(this.state[key].value);
            this.state[key].path.replaceWithSourceString(`i18n.t(k.${kValue})`);
          }
        });
        // Do not add imports if there is no replaceable text
        // in this file
        if (LutManager.getUniqueKeyFromFreeTextNumCalls > 0) {
          if (!this.alreadyImportedK) path.node.body.unshift(_.cloneDeep(kImportStatement));
          if (!this.alreadyImportedi18n) {
            path.node.body
              .unshift(_.cloneDeep(i18nextImportStatement));
          }
        }
      },
    },
    ImportDeclaration: {
      enter(path) {
        // For idempotence
        if (path.node.source.value.match(/i18n\/keys/)) {
          this.alreadyImportedK = true;
        }
        if (path.node.source.value.match(/^i18next$/)) {
          this.alreadyImportedi18n = true;
        }
      },
    },
    JSXExpressionContainer: {
      enter(path) {
        if (t.isIdentifier(path.node.expression)) {
          const key = path.node.expression.name;
          this.state[key] = _.merge(this.state[key], { valid: true });
        } else if (t.isTemplateLiteral(path.node.expression)) {
          const { expressions, quasis } = path.node.expression;
          expressions.forEach((expression) => {
            const key = expression.name;
            this.state[key] = _.merge(this.state[key], { valid: true });
          });
          quasis.forEach((templateElement, index) => {
            const coreValue = templateElement.value.raw.trim();
            if (coreValue.length) {
              const qPath = path.get('expression.quasis')[index];
              const kValue = getUniqueKeyFromFreeText(coreValue);
              // TODO: OPTIMIZATION: Use quasi quotes to optimize this
              // TODO: Replace the path instead of modifying the raw
              qPath.node.value.raw = qPath.node.value.raw.replace(coreValue, `\${i18n.t(k.${kValue})}`);
              qPath.node.value.cooked = qPath.node.value.cooked.replace(coreValue, `\${i18n.t(k.${kValue})}`);
            }
          });
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
