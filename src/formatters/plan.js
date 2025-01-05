const inputValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const formatPlain = (data) => {
  const iter = (diff, keys) => {
    const lines = diff
      .filter(({ type }) => type !== 'unchanged')
      .map((el) => {
        const { type } = el;
        const currentPath = [...keys, el.key].join('.');
        switch (type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${inputValue(el.value2)}`;
          case 'deleted':
            return `Property '${currentPath}' was removed`;
          case 'changed':
            return `Property '${currentPath}' was updated. From ${inputValue(el.value1)} to ${inputValue(el.value2)}`;
          case 'nested':
            return iter(el.children, [...keys, el.key]);
          default:
            throw new Error(`Unknown property type: '${type}'!`);
        }
      });
    return lines.join('\n');
  };
  return iter(data, []);
};

export default formatPlain;
