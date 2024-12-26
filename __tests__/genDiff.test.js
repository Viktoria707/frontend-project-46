import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import genDiff from '../src/genDiff.js';
import formatStylish from '../src/formatters/stylish.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

describe('genDiff', () => {
  test('should return correct diff for nested JSON objects', () => {
    const data1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));

    const expectedOutput = `{
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
          setting5: {
            + key5: value5
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
      group2: {
        - abc: 12345
          deep: {
            - id: 45
        }
    }
      group3: {
          deep: {
              id: {
                + number: 45
            }
        }
        + fee: 100500
    }
}`;
    const result = formatStylish(genDiff(data1, data2));
    expect(result).toBe(expectedOutput);
  });

  test('should return correct diff for nested YAML objects', () => {
    const data1 = yaml.load(fs.readFileSync(getFixturePath('file1.yml'), 'utf-8'));
    const data2 = yaml.load(fs.readFileSync(getFixturePath('file2.yml'), 'utf-8'));
    const expectedOutput = `{
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
          setting5: {
            + key5: value5
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
      group2: {
        - abc: 12345
          deep: {
            - id: 45
        }
    }
      group3: {
          deep: {
              id: {
                + number: 45
            }
        }
        + fee: 100500
    }
}`;

    const result = formatStylish(genDiff(data1, data2));
    expect(result).toBe(expectedOutput);
  });
});
