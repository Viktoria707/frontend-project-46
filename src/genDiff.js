import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const differences = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!(key in data1) && key in data2) {
      if (_.isObject(value2) && value2 !== null) {
        return { key, children: genDiff({}, value2), type: 'nested' };
      }
      return { key, value: value2, type: 'added' };
    }
    if (key in data1 && !(key in data2)) {
      if (_.isObject(value1) && value1 !== null) {
        return { key, children: genDiff(value1, {}), type: 'nested' };
      }
      return { key, value: value1, type: 'removed' };
    }
    if (!_.isEqual(value1, value2)) {
      if (_.isObject(value1) && value1 !== null && _.isObject(value2) && value2 !== null) {
        return { key, children: genDiff(value1, value2), type: 'nested' };
      }

      if (_.isObject(value1) && value1 !== null && !_.isObject(value2)) {
        return {
          key,
          oldValue: value1,
          newValue: value2,
          type: 'changed',
        };
      }

      if (!_.isObject(value1) && _.isObject(value2) && value2 !== null) {
        return {
          key,
          oldValue: value1,
          newValue: value2,
          type: 'changed',
        };
      }

      return {
        key,
        oldValue: value1,
        newValue: value2,
        type: 'changed',
      };
    }

    return { key, value: value1, type: 'unchanged' };
  });

  return differences;
};

export default genDiff;
