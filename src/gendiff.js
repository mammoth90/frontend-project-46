import fs from "fs"
import path from 'path'
import _ from 'lodash'

const formatLine = (sign, key, value) => ` ${sign} ${key}: ${value}\n`

const parsing = (file, type) => {
  switch(type) {
    case '.json': 
      try{
        return JSON.parse(file)
      }
      catch{
     throw new Error('Invalid JSON file') 
      }
    default: throw Error(`Unsupported file type: ${type}`)
  }
}

const buildDiff = (data1, data2) => {
  const commonObj = _.assign({}, data1, data2)
  return Object.keys(commonObj)
    .sort()
    .reduce((acc, key) => {
    if (data1[key] === data2[key]){
      acc += formatLine(' ', key, data1[key])
      return acc
    }
    if (_.has(data1, key)) {
      acc += formatLine('-', key, data1[key])
    }
    if (_.has(data2, key)) {
      acc += formatLine('+', key, data2[key])
    }

    return acc
  }, '')
}

export default function  (file1, file2) {
  const dataFile1 =fs.readFileSync(file1, 'utf-8')
  const dataFile2 = fs.readFileSync(file2, 'utf-8')
  const parsedFile1 = parsing(dataFile1, path.extname(file1))
  const parsedFile2 = parsing(dataFile2, path.extname(file2))
//  console.log(genDiff(parsedFile1, parsedFile2))
  return buildDiff(parsedFile1, parsedFile2)
}


