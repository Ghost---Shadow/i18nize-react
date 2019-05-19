const _ = require('lodash');

const {
  i18nextImportStatement,
  kImportStatement,
} = require('./frozen-asts');

const {
  getUniqueKeyFromFreeText,
  LutManager,
} = require('./lut');

const {
  isBlacklistedForJsxAttribute,
  handleConditionalExpressions,
} = require('./plugin-helpers');

const handleStringLiteral = (path, table, key) => {
  const { value } = path.node;
  if (!table[key]) table[key] = {};
  if (!table[key].pairs) table[key].pairs = [];
  table[key].pairs.push({ path, value });
};

const extractValueAndUpdateTable = (t, table, path, key) => {
  if (t.isStringLiteral(path.node)) {
    handleStringLiteral(path, table, key);
  } else if (t.isArrayExpression(path.node)) {
    path.get('elements').forEach((element) => {
      if (t.isStringLiteral(element.node)) handleStringLiteral(element, table, key);
    });
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
      exit(programPath) {
        Object.keys(this.state).forEach((key) => {
          if (this.state[key].valid && this.state[key].pairs) {
            this.state[key].pairs.forEach(({ path, value }) => {
              // TODO: OPTIMIZATION: Use quasi quotes to optimize this
              const kValue = getUniqueKeyFromFreeText(value);
              path.replaceWithSourceString(`i18n.t(k.${kValue})`);
            });
          }
        });
        // Do not add imports if there is no replaceable text
        // in this file
        if (LutManager.getUniqueKeyFromFreeTextNumCalls > 0) {
          if (!this.alreadyImportedK) programPath.node.body.unshift(_.cloneDeep(kImportStatement));
          if (!this.alreadyImportedi18n) {
            programPath.node.body
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

        if (isBlacklistedForJsxAttribute(path)) return;

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
        // TODO: Explore the reason behind crash
        const key = _.get(path, 'node.left.name', _.get(path, 'node.left.property.name'));
        if (!key) return;
        extractValueAndUpdateTable(t, this.state, path.get('right'), key);
      },
    },
    ObjectProperty: {
      enter(path) {
        const key = _.get(path, 'node.key.name');
        if (!key) return;

        // Check for blacklist
        if (isBlacklistedForJsxAttribute(path)) return;

        extractValueAndUpdateTable(t, this.state, path.get('value'), key);
      },
    },
    VariableDeclarator: {
      enter(path) {
        // TODO: Explore the reason behind crash
        const key = _.get(path, 'node.id.name');
        if (!key) return;

        // Check for blacklist
        if (isBlacklistedForJsxAttribute(path)) return;

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
        handleConditionalExpressions(path);
      },
    },
  },
});
