import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import genDiff from '../src/genDiff.js';
import formatStylish from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plan.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

describe('genDiff', () => {
  test('should return correct diff for nested JSON objects', () => {
    const data1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));

    const expectedOutput = `  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
            key5: value5
        }
      setting6: {
          doge: {
            - wow: 
            + wow: so much            
          }
          key: value
        + ops: vops        
      }    
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
            key: value
        }
    + nest: str    
  }
- group2: {
        abc: 12345
        deep: {
                id: 45
            }
    }
+ group3: {
        deep: {
                id: {
                        number: 45
                    }
            }
        fee: 100500
    }`;
    const result = formatStylish(genDiff(data1, data2));
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff for nested YAML objects', () => {
    const data1 = yaml.load(fs.readFileSync(getFixturePath('file1.yml'), 'utf-8'));
    const data2 = yaml.load(fs.readFileSync(getFixturePath('file2.yml'), 'utf-8'));
    const expectedOutput = `  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
            key5: value5
        }
      setting6: {
          doge: {
            - wow: 
            + wow: so much            
          }
          key: value
        + ops: vops        
      }    
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
            key: value
        }
    + nest: str    
  }
- group2: {
        abc: 12345
        deep: {
                id: 45
            }
    }
+ group3: {
        deep: {
                id: {
                        number: 45
                    }
            }
        fee: 100500
    }`;

    const result = formatStylish(genDiff(data1, data2));
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff in plain format for JSON objects', () => {
    const data1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));
    const expectedOutput = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

    const result = formatPlain(genDiff(data1, data2));
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff in plain format for YAML objects', () => {
    const data1 = yaml.load(fs.readFileSync(getFixturePath('file1.yml'), 'utf-8'));
    const data2 = yaml.load(fs.readFileSync(getFixturePath('file2.yml'), 'utf-8'));

    const expectedOutput = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

    const result = formatPlain(genDiff(data1, data2));
    expect(result).toBe(expectedOutput);
  });
});
