import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys1, keys2).sort();

  const diffTree = allKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', valueAfter: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', valueBefore: data1[key] };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = genDiff(data1[key], data2[key]);
      return { key, type: 'nested', children };
    }

    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', valueBefore: data1[key], valueAfter: data2[key],
      };
    }

    return { key, type: 'unchanged', valueBefore: data1[key] };
  });

  return diffTree;
};

export default genDiff;
