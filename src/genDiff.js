import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const differences = keys.map((key) => {
    if (!(key in data1) && key in data2) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (key in data1 && !(key in data2)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return [
        `- ${key}: ${data1[key]}`,
        `+ ${key}: ${data2[key]}`,
      ];
    }
    return `${key}: ${data1[key]}`;
  });

  const result = differences.flat().filter(Boolean);

  return result.length > 0 ? `{\n ${result.join('\n ')}\n}` : '{}';
};

export default genDiff;
