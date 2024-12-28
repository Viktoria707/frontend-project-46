#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import parseFile from '../src/fileParser.js';
import genDiff from '../src/genDiff.js';
import getFormatter from '../src/formatters/index.js';

const program = new Command();
const version = '1.0.0';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish');

program.action((filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const options = program.opts();
  const formatName = options.format;
  try {
    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);
    const diff = genDiff(data1, data2);
    const formatDiffTree = getFormatter(formatName);
    const formattedDiff = formatDiffTree(diff);
    console.log(formattedDiff);
  } catch (error) {
    console.error(`Error reading files: ${error.message}`);
  }
});

program.parse(process.argv);
