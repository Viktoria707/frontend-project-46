import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }

  const indent = ' '.repeat(depth * 2 + 2);
  const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`;
};

const formatStylish = (differences, depth = 1) => {
  const lines = differences.map(({
    key, value, type, oldValue, newValue, children,
  }) => {
    const indent = ' '.repeat(depth * 4);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(oldValue, depth)}\n${indent}+ ${key}: ${stringify(newValue, depth)}`;
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(children, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth)}`;
      default:
        break;
    }
  });

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

export default formatStylish;
