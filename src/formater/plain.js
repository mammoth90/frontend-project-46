import _ from 'lodash'

const trueValue = (value) => (typeof value === 'string' ? `'${value}'` : value)

const printLeaf = (currentNode, mainKey) => {
  let node = ''
  const { type, newValue, key, value } = currentNode
  const currentKey = `${[...mainKey, key].join('.')}`

  switch (type) {
    case 'removed':
      node += `Property '${currentKey}' was removed\n`
      return node

    case 'added':
      node += `Property '${currentKey}' was added with value: ${trueValue(value)}\n`
      return node

    case 'unchanged':
      return node

    case 'changed':
      node += `Property '${currentKey}' was updated. From ${trueValue(value)} to ${trueValue(newValue)}\n`
      return node

    default:
      return node
  }
}

export default (tree) => {
  const iter = (tree, mainKey) => {
    let printedTree = ''
    for (let i = 0; tree.length > i; i++) {
      let { nested } = tree[i]
      if (nested === false) {
        printedTree += printLeaf(tree[i], mainKey)
      } else if (nested === true) {
        if (_.has(tree[i], 'children')) {
          let { children, key } = tree[i]
          printedTree += `${iter(children, [...mainKey, key])}`
        }
        let { key, type } = tree[i]
        if (type === 'added') {
          const currentKey = `${[...mainKey, key].join('.')}`
          printedTree += `Property '${currentKey}' was added with value: [complex value]\n`
        }
        if (type === 'removed') {
          const currentKey = `${[...mainKey, key].join('.')}`
          printedTree += `Property '${currentKey}' was removed\n`
        }
      } else {
        let { value, newValue, key } = tree[i]
        const currentKey = `${[...mainKey, key].join('.')}`
        printedTree += _.isObject(value)
          ? `Property '${currentKey}' was updated. From [complex value] to ${trueValue(newValue)}\n`
          : `Property '${currentKey}' was updated. From ${trueValue(value)} to [complex value]\n`
      }
    }
    return printedTree
  }
  const result = iter(tree, [])
  return result.trim()
}
