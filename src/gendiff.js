import fs from "fs";
import path from "path";
import _ from "lodash";
import parser from "./parsers.js";

const formatLine = (sign, key, value) => ` ${sign} ${key}: ${value}\n`;

const buildDiff = (data1, data2) => {
  const commonObj = _.assign({}, data1, data2);
  return Object.keys(commonObj)
    .sort()
    .reduce((acc, key) => {
      if (data1[key] === data2[key]) {
        acc += formatLine(" ", key, data1[key]);
        return acc;
      }
      if (_.has(data1, key)) {
        acc += formatLine("-", key, data1[key]);
      }
      if (_.has(data2, key)) {
        acc += formatLine("+", key, data2[key]);
      }

      return acc;
    }, "");
};

const readingFile = (file) => {
  var data = ''
  try {
    data = fs.readFileSync(file, 'utf-8')
    return data
  }
  catch {
    throw new Error (`Can't read file ${file}! It may be broken or not exists`)
  }
}
export default function (file1, file2) {
  const dataFile1 = readingFile(file1);
  const dataFile2 = readingFile(file2);
  const parsedFile1 = parser(dataFile1, path.extname(file1));
  const parsedFile2 = parser(dataFile2, path.extname(file2));
  return buildDiff(parsedFile1, parsedFile2);
}
