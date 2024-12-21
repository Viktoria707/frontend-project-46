import fs from 'fs';

export const parseJsonFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};
