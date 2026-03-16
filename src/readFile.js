import fs from 'fs'

export const readingFile = (file) => {
  let data = ''
  try {
    data = fs.readFileSync(file, 'utf-8')
    return data
  }
  catch {
    throw new Error(`Can't read file ${file}! It may be broken or not exists`)
  }
}
