#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const babel = require('@babel/core');
const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { default: relativeImportPlugin } = require('babel-project-relative-import');

const myPlugin = require('./plugin');
const { walk } = require('./walker');
const { generateI18nFiles } = require('./i18n-utils');
const plugins = require('./used-plugins');
const { LutManager } = require('./lut');

const inputDir = process.argv[2] || './';
const outputDir = process.argv[3] || './';
const sourceDir = process.argv[4] || 'src'; // Default in React projects
const isDry = process.argv[5] || false; // Dont transform (just for testing)

const transformFile = (fileName) => {
  try {
    console.log('Transforming:', fileName);
    const inputCode = fs.readFileSync(fileName, 'utf8');
    const ast = parser.parse(inputCode, {
      sourceType: 'module',
      plugins,
    });

    if (!isDry) { traverse(ast, myPlugin(babel).visitor); }
    // Convert all the ~/i18n/keys to <workplace_dir>/src/i18n/keys
    const state = {
      file: {
        opts: {
          sourceRoot: path.resolve(inputDir),
          filename: fileName,
        },
      },
      opts: {
        sourceDir,
      },
    };
    traverse(ast, relativeImportPlugin(babel).visitor, null, state);

    const { code } = babel.transformFromAst(ast);

    const relativePath = path.relative(inputDir, fileName);
    const outputFilePath = path.join(outputDir, relativePath);
    mkdirp.sync(path.dirname(outputFilePath));
    fs.writeFileSync(outputFilePath, code);
  } catch (err) {
    console.error('Error for file:', fileName);
    console.error(err);
  }
};

// If running this script for the second time, it should not
// discard the table generated from the first run
if (fs.existsSync(path.join(path.resolve(inputDir), `${sourceDir}/i18n/english.js`))) {
  console.log('english.js exists');
  // eslint-disable-next-line
  const oldLut = require(path.join(path.resolve(inputDir), `${sourceDir}/i18n/english`));
  LutManager.setLut(oldLut);
}

const allFiles = walk(path.resolve(inputDir));

allFiles.forEach(fileName => transformFile(fileName));

generateI18nFiles(outputDir, sourceDir);

if (isDry) {
  console.log('Successfully did a dry walk');
}

// npm start ../input-directory ../output-directory
