// module.exports = ({ types: t }) => ({
module.exports = () => ({
  name: 'i18ize-react',
  visitor: {
    JSXText: {
      enter(path) {
        const trimmedValue = path.node.value.trim();
        if (!trimmedValue.length) return;
        path.node.value = path.node.value.replace(trimmedValue, '{t(k.SOME_TEXT)}');
      },
    },
  },
});
