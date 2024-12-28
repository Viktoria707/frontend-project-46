import formatPlain from './plan.js';
import formatDiffTree from './stylish.js';

const formatters = {
  plain: formatPlain,
  stylish: formatDiffTree,
};

export default (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};
