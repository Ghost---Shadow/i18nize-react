const { types: t } = require('@babel/core');

const {
  getUniqueKeyFromFreeText,
} = require('./lut');

const BLACKLISTED_JSX_ATTRIBUTES = [
  // React router
  'path', 'from', 'to', 'href', 'as',
  // Inline style
  'style', 'className', 'color',
  // Code
  'dangerouslySetInnerHTML', 'src',
];

// Dont extract value for Literals under this attribute
const isBlacklistedForJsxAttribute = (path) => {
  const jsxAttributeParent = path.findParent(p => p.isJSXAttribute());
  if (!jsxAttributeParent) return false;
  const name = jsxAttributeParent.node.name && jsxAttributeParent.node.name.name;
  return BLACKLISTED_JSX_ATTRIBUTES.includes(name);
};


const handleConditionalExpressions = (path) => {
  // For ternary operators
  if (!path.findParent(p => p.isConditionalExpression())) return;

  // Only extract the value of identifiers
  // who are children of some JSX element
  if (!path.findParent(p => p.isJSXElement())) return;

  // Check for blacklist
  if (isBlacklistedForJsxAttribute(path)) return;

  const coreValue = (path.node.value || '').trim();
  if (!coreValue.length) return;
  const kValue = getUniqueKeyFromFreeText(coreValue);

  const srcString = `i18n.t(k.${kValue})`;
  if (t.isJSXAttribute(path.parent)) {
    // TODO: The next line does not parse
    // path.replaceWithSourceString(`{${srcString}}`);
  } else {
    path.replaceWithSourceString(srcString);
  }
};

module.exports = {
  isBlacklistedForJsxAttribute,
  handleConditionalExpressions,
  BLACKLISTED_JSX_ATTRIBUTES,
};
