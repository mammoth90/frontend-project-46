import stylish from './stylish.js'
import plain from './plain.js'

export const formater = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree)
    case 'plain':
      return plain(tree)

    default:
      return stylish(tree)
  }
}
