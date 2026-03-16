import genDiff from '../src/index.js'
import { readingFile } from '../src/readFile.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const expectedResult = readingFile(getFixturePath('result.txt'))

const jsonFile1 = getFixturePath('file1.json')
const jsonFile2 = getFixturePath('file2.json')
const jsonFile3 = getFixturePath('file3.json')
const jsonFile4 = getFixturePath('file4.json')

const yamlFile1 = getFixturePath('file1.yaml')
const yamlFile2 = getFixturePath('file2.yml')
const expectedStylish = readingFile(getFixturePath('resultSTYLISH.txt'))
const expectedPlain = readingFile(getFixturePath('resultPlain.txt'))
const expectedJSON = readingFile(getFixturePath('resultJSON.txt'))

test('gendiff JSON', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toEqual(expectedResult)
})

test('gendiff YAML', () => {
  expect(genDiff(yamlFile1, yamlFile2)).toEqual(expectedResult)
})

test('NESTED gendiff STYLISH', () => {
  expect(genDiff(jsonFile3, jsonFile4, 'stylish')).toEqual(expectedStylish)
})

test('NESTED gendiff PLAIN', () => {
  expect(genDiff(jsonFile3, jsonFile4, 'plain')).toEqual(expectedPlain)
})

test('NESTED gendiff JSON ', () => {
  expect(genDiff(jsonFile3, jsonFile4, 'json')).toEqual(expectedJSON)
})
