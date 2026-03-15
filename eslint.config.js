const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'test/fixtures/**/output.js',
      'test/__file_snapshots__/**',
      'i18n-static/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-param-reassign': 'off',
      'no-console': 'warn',
    },
  },
];
