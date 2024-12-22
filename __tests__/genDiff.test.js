import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import genDiff from '../src/genDiff.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

describe('genDiff', () => {
  test('should return correct diff for flat JSON objects', () => {
    const data1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));

    const expectedOutput = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

    const result = genDiff(data1, data2);
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff for flat YAML objects', () => {
    const data1 = yaml.load(fs.readFileSync(getFixturePath('file1.yml'), 'utf-8'));
    const data2 = yaml.load(fs.readFileSync(getFixturePath('file2.yml'), 'utf-8'));
    const expectedOutput = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
    const result = genDiff(data1, data2);
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff when both objects are identical', () => {
    const data1 = {
      host: 'hexlet.io',
      timeout: 50,
    };

    const data2 = {
      host: 'hexlet.io',
      timeout: 50,
    };

    const expectedOutput = `{
   host: hexlet.io
   timeout: 50
}`;

    const result = genDiff(data1, data2);
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff when one object is empty', () => {
    const data1 = {
      host: 'hexlet.io',
      timeout: 50,
    };

    const data2 = {};

    const expectedOutput = `{
 - host: hexlet.io
 - timeout: 50
}`;

    const result = genDiff(data1, data2);
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff when both objects are empty', () => {
    const data1 = {};
    const data2 = {};

    const expectedOutput = '{}';

    const result = genDiff(data1, data2);
    expect(result).toBe(expectedOutput);
  });
});
