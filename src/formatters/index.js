import formatPlain from './plan.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const formatChoice = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return formatJson(data);
    default:
      throw new Error(`Unknown formatter: '${format}'!`);
  }
};

export default formatChoice;
