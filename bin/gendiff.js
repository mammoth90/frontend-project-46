#!/usr/bin/env node
import { Command, Option } from "commander"
const programm = new Command();

programm 
  .name('gendiff')
  .description(`Compares two configuration files and shows a difference`)
  .argument('<filepath1>', 'input file path')
  .argument('<filepath2>', 'output file path')
  .version('1.0')

programm
  .option('-f, --format [type]', 'output format')
  .parse(process.argv)

 
