import genDiff from '../src/gendiff.js'
import { fileURLToPath } from 'url';
import  path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = " - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n"

const jsonFile1 = getFixturePath('file1.json')
const jsonFile2 = getFixturePath('file2.json')

const yamlFile1 = getFixturePath('file1.yaml')
const yamlFile2 = getFixturePath('file2.yml')


test('gendiff JSON', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toEqual(expectedResult)
})

test('gendiff YAML', () => {
  expect(genDiff(yamlFile1, yamlFile2)).toEqual(expectedResult)
})
