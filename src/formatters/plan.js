import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const formatPlain = (diffTree) => {
  const iter = (tree, parentKey = '') => tree.flatMap(({ key, type, valueBefore, valueAfter, children }) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    switch (type) {
      case 'added':
        return `Property '${fullKey}' was added with value: ${stringify(valueAfter)}`;
      case 'deleted':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
      case 'nested':
        return iter(children, fullKey);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }).join('\n');

  return iter(diffTree);
};

export default formatPlain;
