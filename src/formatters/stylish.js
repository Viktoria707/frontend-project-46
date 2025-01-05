import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth + 1) * spacesCount);
const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount);

const getValue = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  const lines = Object.entries(currentValue).map(([key, value]) => `${currentIndent}${key}: ${getValue(value, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (data) => {
  const iter = (diff, depth) => {
    const currentIndent = getIndent(depth).slice(0, -2);
    const bracketIndent = getBracketIndent(depth);

    const lines = diff.map((el) => {
      const { type } = el;
      switch (type) {
        case 'added':
          return `${currentIndent}+ ${el.key}: ${getValue(el.value2, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${el.key}: ${getValue(el.value1, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${el.key}: ${getValue(el.value1, depth + 1)}`,
            `${currentIndent}+ ${el.key}: ${getValue(el.value2, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${currentIndent}  ${el.key}: ${getValue(el.value1, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${el.key}: ${iter(el.children, depth + 1)}`;
        default:
          throw new Error(`Unknown property type: '${type}'!`);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data, 0);
};

export default formatStylish;
