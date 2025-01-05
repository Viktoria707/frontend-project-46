#!/usr/bin/env node

import { program } from 'commander';

import fs from 'fs';
import path from 'path';
import parse from '../src/fileParser.js';
import getDifferences from '../src/genDifference.js';
import formatChoice from '../src/formatters/index.js';

const getContentParse = (filepath) => {
  const normalizePath = path.resolve(process.cwd(), filepath);
  const getContent = fs.readFileSync(normalizePath, 'utf-8');
  const getExtension = path.extname(filepath).slice(1);

  return parse(getContent, getExtension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getContentParse(filepath1);
  const data2 = getContentParse(filepath2);

  return formatChoice(getDifferences(data1, data2), formatName);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
