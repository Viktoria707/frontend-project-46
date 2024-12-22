import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const extname = path.extname(filepath);
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  if (extname === '.json') {
    return JSON.parse(fileContent);
  }
  if (extname === '.yml' || extname === '.yaml') {
    return yaml.load(fileContent);
  }
  throw new Error(`Unsupported file type: ${extname}`);
};

export default parseFile;
