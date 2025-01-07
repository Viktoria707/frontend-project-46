import fs from 'fs';
import path from 'path';
import parse from './fileParser.js';
import getDifferences from './genDifference.js';
import formatChoice from './formatters/index.js';

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

export default genDiff;
