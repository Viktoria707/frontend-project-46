#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import parseFile from '../src/fileParser.js';
import genDiff from '../src/genDiff.js';

const program = new Command();
const version = '1.0.0';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

program.action((filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  try {
    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);
    const diff = genDiff(data1, data2);
    console.log(diff);
  } catch (error) {
    console.error(`Error reading files: ${error.message}`);
  }
});

program.parse(process.argv);
