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
      catch(err){
     throw new Error('Invalid JSON file') 
      }
    default: throw Error(`Unsupported file type: ${type}`)
  }
}

const genDiff = (data1, data2) => {
  const commonObj = _.assign({}, data1, data2)
  const result = Object.keys(commonObj)
    .sort()
    .reduce((acc, key) => {
    if (data1[key] === data2[key]){
      acc += formatLine(' ', key, data1[key])
      return acc
    }
    let fstFile = _.has(data1, key) ? formatLine('-', key, data1[key]) : ''
    let sndFile = _.has(data2, key) ? formatLine('+', key, data2[key]) : ''
    acc += `${fstFile}${sndFile}`
    return acc
  }, '')
  return result
}

const gendiff = (file1, file2) => {
  const dataFile1 =fs.readFileSync(file1, 'utf-8')
  const dataFile2 = fs.readFileSync(file2, 'utf-8')
  const parsedFile1 = parsing(dataFile1, path.extname(file1))
  const parsedFile2 = parsing(dataFile2, path.extname(file2))

  console.log(genDiff(parsedFile1, parsedFile2))
  return genDiff(parsedFile1, parsedFile2)
}


export { gendiff }
