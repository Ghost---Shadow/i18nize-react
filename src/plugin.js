const extractValueAndUpdateTable = (t, table, valuedNode, key) => {
  const { value } = valuedNode;

  if (t.isStringLiteral(valuedNode)) {
    if (!table[key]) table[key] = {};
    table[key].value = value;
    table[key].node = valuedNode;
  }
};

module.exports = ({ types: t }) => ({
  name: 'i18ize-react',
  visitor: {
    Program: {
      enter() {
        this.state = {};
      },
      exit() {
        console.table(this.state);

        Object.keys(this.state).forEach((key) => {
          if (this.state[key].valid) {
            this.state[key].node.value = 't(k.SOME_TEXT)';
          }
        });
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
        extractValueAndUpdateTable(t, this.state, path.node.right, key);
      },
    },
    ObjectProperty: {
      enter(path) {
        const key = path.node.key.name;
        extractValueAndUpdateTable(t, this.state, path.node.value, key);
      },
    },
    VariableDeclarator: {
      enter(path) {
        const key = path.node.id.name;
        extractValueAndUpdateTable(t, this.state, path.node.init, key);
      },
    },
    JSXText: {
      enter(path) {
        const coreValue = path.node.value.trim();
        if (!coreValue.length) return;
        path.node.value = path.node.value.replace(coreValue, '{t(k.SOME_STRING)}');
      },
    },
  },
});
