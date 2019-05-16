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
  if (t.isStringLiteral(path.node)) {
    const { value } = path.node;
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
    Identifier: {
      enter(path) {
        // Only extract the value of identifiers
        // who are children of some JSX element
        if (path.findParent(p => p.isJSXElement())) {
          this.state[path.node.name] = _.merge(this.state[path.node.name], { valid: true });
        }
      },
    },
    TemplateLiteral: {
      enter(path) {
        // Only extract the value of identifiers
        // who are children of some JSX element
        const firstJsxParent = path.findParent(p => p.isJSXElement());
        if (!firstJsxParent) return;

        // Ignore CSS strings
        if (_.get(firstJsxParent, 'node.openingElement.name.name') === 'style') return;

        const { expressions, quasis } = path.node;
        expressions.forEach((expression) => {
          const key = expression.name;
          this.state[key] = _.merge(this.state[key], { valid: true });
        });
        quasis.forEach((templateElement, index) => {
          const coreValue = templateElement.value.raw.trim();
          if (coreValue.length) {
            const qPath = path.get('quasis')[index];
            const kValue = getUniqueKeyFromFreeText(coreValue);
            // TODO: OPTIMIZATION: Use quasi quotes to optimize this
            // TODO: Replace the path instead of modifying the raw
            qPath.node.value.raw = qPath.node.value.raw.replace(coreValue, `\${i18n.t(k.${kValue})}`);
            qPath.node.value.cooked = qPath.node.value.cooked.replace(coreValue, `\${i18n.t(k.${kValue})}`);
          }
        });
      },
    },
    AssignmentExpression: {
      enter(path) {
        const key = _.get(path, 'node.left.name', _.get(path, 'node.left.property.name'));
        if (!key) return;
        extractValueAndUpdateTable(t, this.state, path.get('right'), key);
      },
    },
    ObjectProperty: {
      enter(path) {
        // TODO: Explore the reason behind crash
        const key = _.get(path, 'node.key.name');
        if (!key) return;
        extractValueAndUpdateTable(t, this.state, path.get('value'), key);
      },
    },
    VariableDeclarator: {
      enter(path) {
        // TODO: Explore the reason behind crash
        const key = _.get(path, 'node.id.name');
        if (!key) return;
        extractValueAndUpdateTable(t, this.state, path.get('init'), key);
      },
    },
    JSXText: {
      enter(path) {
        const coreValue = _.get(path, 'node.value', '').trim();
        if (!coreValue.length) return;
        const kValue = getUniqueKeyFromFreeText(coreValue);
        // TODO: OPTIMIZATION: Use quasi quotes to optimize this
        path.node.value = path.node.value.replace(coreValue, `{i18n.t(k.${kValue})}`);
      },
    },
    StringLiteral: {
      enter(path) {
        // For ternary operators
        if (!path.findParent(p => p.isConditionalExpression())) return;

        // Only extract the value of identifiers
        // who are children of some JSX element
        if (!path.findParent(p => p.isJSXElement())) return;

        const coreValue = _.get(path, 'node.value', '').trim();
        if (!coreValue.length) return;
        const kValue = getUniqueKeyFromFreeText(coreValue);
        // TODO: OPTIMIZATION: Use quasi quotes to optimize this
        path.replaceWithSourceString(`i18n.t(k.${kValue})`);
      },
    },
  },
});
