import fs from 'fs';

const parseJsonFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};

export default parseJsonFile;
