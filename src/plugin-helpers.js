const babel = require('@babel/core');
const _ = require('lodash');

const {
  getUniqueKeyFromFreeText,
} = require('./lut');

// Dont extract value for Literals under this attribute
const isBlacklistedForJsxAttribute = (path) => {
  const blacklistedJsxAttributes = [
    // React router
    'path', 'from', 'to', 'href', 'as',
    // Inline style
    'style', 'className', 'color',
    // Code
    'dangerouslySetInnerHTML', 'src',
    // custom
    'width', 'variant', 'dataTestId', 'borderRadius', 'id', 'alt', 'background', 'link', 'ariaLabel',
    'aria-label', 'alignItems', 'onMouseEnter', 'data-test-id', 'paddingLeft', 'maxWidth', 'padding',
    'marginTop', 'horizontal', 'vertical', 'anchorOrigin', 'transformOrigin', 'PaperProps', 'navigate',
    '$overflowY', 'shortLivedTokenExpiredAction', 'height', 'field', 'active', 'emoji', 'trackInHeap', 
    'onClick', 'paddingTop', 'icon', 'key', 'HelperTextProps', 'permissions', 'path',
    'featureFlag', 'unauthenticatedAction', 'minWidth','paperProps', 'paddingBottom', 'paddingRight'

  ];
  const jsxAttributeParent = path.findParent(p => p.isJSXAttribute());
  if (!jsxAttributeParent) return false;
  const name = _.get(jsxAttributeParent, 'node.name.name');
  if (blacklistedJsxAttributes.includes(name)) return true;
  return false;
};

const handleBlacklistedNode = (path) => {
  const blacklistValue = [
    '/app/organise'

  ];

  if (blacklistValue.includes(path.node.value)) return true;


}

const handleBlackListKey  = (key) => {
  const blacklistValue = [
    'kind'

  ];

  if (blacklistValue.includes(key)) return true;
}

const handleBlackListValue  = (key) => {
  const blacklistValue = [
    '/app/measure?show=ghg-protocol-upload'

  ];

  if (blacklistValue.includes(key)) return true;
}



const handleBlackListVariable= (key) => {
  const blacklistValues = [
    'padding2Px', 'borderRadiusPx','maxWidth', 'columnWidths', 'dispatch'
  ];

  if (blacklistValues.includes(key)) return true;
  if (blacklistValues.includes(key.name)) return true;
}

const handleConditionalExpressions = (path) => {
  // For ternary operators
  if (!path.findParent(p => p.isConditionalExpression())) return;

  // Only extract the value of identifiers
  // who are children of some JSX element
  if (!path.findParent(p => p.isJSXElement())) return;

  // Check for blacklist
  if (isBlacklistedForJsxAttribute(path)) return;

  const coreValue = _.get(path, 'node.value', '').trim();
  if (!coreValue.length) return;
  const kValue = getUniqueKeyFromFreeText(coreValue);
  // TODO: OPTIMIZATION: Use quasi quotes to optimize this

  const srcString = `i18n.t(k.${kValue})`;
  if (babel.types.isJSXAttribute(path.parent)) {
    // TODO: The next line does not parse
    // path.replaceWithSourceString(`{${srcString}}`);
  } else {
    path.replaceWithSourceString(srcString);
  }
};

const handleURLInlitterals = (value) => {
 if (value.startsWith('/')) return true
}

module.exports = {
  isBlacklistedForJsxAttribute,
  handleConditionalExpressions,
  handleBlacklistedNode,
  handleBlackListVariable,
  handleBlackListKey,
  handleBlackListValue,
  handleURLInlitterals,
};
