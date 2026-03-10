import _ from 'lodash'

const makeNote = (key, data1, data2) => {
  if (_.has(data1, key) && _.has(data2, key)) {
    return {
      key,
      value: data1[key],
      nested: false,
      newValue: data2[key],
      type: data2[key] === data1[key] ? 'unchanged' : 'changed',
    }
  }
  if (!_.has(data1, key) && _.has(data2, key)) {
    return {
      key,
      value: data2[key],
      nested: false,
      type: 'added',
    }
  }
  if (_.has(data1, key) && !_.has(data2, key)) {
    return {
      key,
      value: data1[key],
      nested: false,
      type: 'removed',
    }
  }
  return 'no keys found'
}

const buildSimpleTree = (data) => {
  return _.sortBy(Object.keys(data)).map((key) => {
    if (!_.isObject(data[key])) {
      return {
        key,
        value: data[key],
        nested: false,
        type: 'unchanged',
      }
    }
    return {
      key,
      children: buildSimpleTree(data[key]),
      nested: true,
      type: 'unchanged',
    }
  })
}

const maping = (key, data1, data2) => {
  if (!_.isObject(data1[key]) && !_.isObject(data2[key])) {
    return makeNote(key, data1, data2)
  } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        nested: true,
        type: 'object',
        children: buildTree(data1[key], data2[key]),
      }
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        nested: true,
        type: 'added',
        value: buildSimpleTree(data2[key]),
      }
    }
    if (!_.has(data2, key) && _.has(data1, key)) {
      return {
        key,
        nested: true,
        type: 'removed',
        value: buildSimpleTree(data1[key]),
      }
    }
  } else {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        key,
        nested: _.isObject(data1[key]) ? true : false,
        type: 'removed',
        value: _.isObject(data1[key])
          ? buildSimpleTree(data1[key])
          : data1[key],
      }
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        nested: _.isObject(data2[key]) ? true : false,
        type: 'added',
        value: _.isObject(data2[key])
          ? buildSimpleTree(data2[key])
          : data2[key],
      }
    }
    return {
      key,
      nested: 'twisted',
      type: 'changed',
      value: _.isObject(data1[key]) ? buildSimpleTree(data1[key]) : data1[key],
      newValue: _.isObject(data2[key])
        ? buildSimpleTree(data2[key])
        : data2[key],
    }
  }
}

const extractKeys = (data) => {
  if (!_.isObject(data)) {
    return data
  }
  return Object.keys(data)
}

export const buildTree = (data1, data2) => {
  const keys1 = extractKeys(data1)
  const keys2 = extractKeys(data2)
  const tree = _.sortBy(_.union(keys1, keys2)).map((key) => {
    return maping(key, data1, data2)
  })

  return tree
}
