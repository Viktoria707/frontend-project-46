const INDENT_SIZE = 4;
const SYMBOLS = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

const indent = (depth) => ' '.repeat(INDENT_SIZE * depth);
const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const formatObject = (obj) => {
    const keys = Object.keys(obj);
    return keys
      .map((key) => `${indent(depth + 2)}${key}: ${formatValue(obj[key], depth + 2)}`)
      .join('\n');
  };

  return `{\n${formatObject(value)}\n${indent(depth + 1)}}`;
};

const formatNode = (node, depth) => {
  const { key, type, valueBefore, valueAfter, children } = node;
  const indentStr = indent(depth);
  switch (type) {
    case 'unchanged':
      return `${indentStr}${SYMBOLS[type]} ${key}: ${formatValue(valueBefore, depth)}`;
    case 'added':
      return `${indentStr}${SYMBOLS[type]} ${key}: ${formatValue(valueAfter, depth)}`;
    case 'deleted':
      return `${indentStr}${SYMBOLS[type]} ${key}: ${formatValue(valueBefore, depth)}`;
    case 'changed':
      return [
        `${indentStr}${SYMBOLS.deleted} ${key}: ${formatValue(valueBefore, depth)}`,
        `${indentStr}${SYMBOLS.added} ${key}: ${formatValue(valueAfter, depth)}`,
      ];
    case 'nested':
      return `${indentStr}  ${key}: {\n${formatStylish(children, depth + 1)}\n${indentStr}  }`;
    default:
      throw new Error(`Unknown node type: '${type}'!`);
  }
};

const formatStylish = (diffTree, depth = 0) => {
  const lines = diffTree.map((node) => formatNode(node, depth)).flat(depth);
  return `${lines.join('\n')}${indent(depth)}`;
};

export default formatStylish;
