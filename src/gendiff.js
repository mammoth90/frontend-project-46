import fs from "fs"
import path from 'path'

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

const gendiff = (file1, file2) => {
  const dataFile1 =fs.readFileSync(file1, 'utf-8')
  const dataFile2 = fs.readFileSync(file2, 'utf-8')
  const parsedFile1 = parsing(dataFile1, path.extname(file1))
  const parsedFile2 = parsing(dataFile2, path.extname(file2))
  console.log('Read file success!')
  console.log('Result 1:', parsedFile1)
  console.log('Result 2:', parsedFile2)
  return [ parsedFile1, parsedFile2 ]
}
export { gendiff }
