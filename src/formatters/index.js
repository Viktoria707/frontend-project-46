import formatPlain from './plan.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const formatters = {
  plain: formatPlain,
  stylish: formatStylish,
  json: formatJson,
};

export default (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};
