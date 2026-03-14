import { readingFile } from './readFile.js'
import path from 'path'
import parser from './parsers.js'
import { buildTree } from './buildTree.js'
import { formater } from './formater/index.js'

export default function (file1, file2, format) {
  const dataFile1 = readingFile(file1)
  const dataFile2 = readingFile(file2)
  const parsedFile1 = parser(dataFile1, path.extname(file1))
  const parsedFile2 = parser(dataFile2, path.extname(file2))
  const tree = buildTree(parsedFile1, parsedFile2)
  return formater(tree, format)
}
