import _ from 'lodash'

const printLeaf = (currentNode, depth, replacer) => {
  let node = ''
  const { type, newValue, key, value } = currentNode
  switch (type) {
    case 'removed':
      node += `${replacer.repeat(depth)}- ${key}: ${value}\n`
      return node

    case 'added':
      node += `${replacer.repeat(depth)}+ ${key}: ${value}\n`
      return node

    case 'unchanged':
      node += `${replacer.repeat(depth)}  ${key}: ${value}\n`
      return node

    case 'changed':
      node += `${replacer.repeat(depth)}- ${key}: ${value}\n`
      node += `${replacer.repeat(depth)}+ ${key}: ${newValue}\n`
      return node

    default:
      return node
  }
}

export default (tree, replacer = ' ') => {
  const step = 2
  const iter = (tree, depth = 2) => {
    let printedTree = ''
    for (let i = 0; tree.length > i; i++) {
      let { nested } = tree[i]
      if (nested === false) {
        printedTree += printLeaf(tree[i], depth, replacer)
      } else if (nested === true) {
        if (_.has(tree[i], 'children')) {
          let { children, key } = tree[i]
          printedTree += `${replacer.repeat(depth)}  ${key}: {\n${iter(children, depth + step + 2)}${replacer.repeat(depth + 2)}}\n`
        }
        let { key, type, value } = tree[i]
        if (type === 'added') {
          printedTree += `${replacer.repeat(depth)}+ ${key}: {\n${iter(value, depth + step + 2)}${replacer.repeat(depth + 2)}}\n`
        }
        if (type === 'removed') {
          printedTree += `${replacer.repeat(depth)}- ${key}: {\n${iter(value, depth + step + 2)}${replacer.repeat(depth + 2)}}\n`
        }
      } else {
        let { value, newValue, key } = tree[i]
        printedTree += _.isObject(value)
          ? `${replacer.repeat(depth)}- ${key}: {\n${iter(value, depth + step + 2)}${replacer.repeat(depth + 2)}}\n`
          : `${replacer.repeat(depth)}- ${key}: ${value}\n`
        printedTree += _.isObject(newValue)
          ? `${replacer.repeat(depth)}+ ${key}: {\n${iter(newValue, depth + step + 2)}${replacer.repeat(depth + 2)}}\n`
          : `${replacer.repeat(depth)}+ ${key}: ${newValue}\n`
      }
    }
    return printedTree
  }
  const result = iter(tree)
  return `{\n${result}}\n`
}
