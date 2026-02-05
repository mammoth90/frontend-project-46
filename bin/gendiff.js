#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../src/gendiff.js";
import path from "path";
const programm = new Command();

programm
  .name("gendiff")
  .description(`Compares two configuration files and shows a difference`)
  .argument("<filepath1>")
  .argument("<filepath2>")
  .version("1.0");

programm.option("-f, --format [type]", "output format");

programm.action((filepath1, filepath2) => {
  const file1 = path.resolve(process.cwd(), filepath1);
  const file2 = path.resolve(process.cwd(), filepath2);
  const result = genDiff(file1, file2);
  console.log(result);
});

programm.parse(process.argv);
