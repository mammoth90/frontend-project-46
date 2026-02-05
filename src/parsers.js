import { parse } from "yaml";

export default function (file, type) {
  switch (type) {
    case ".json":
      try {
        return JSON.parse(file);
      } catch {
        throw new Error("Invalid JSON file");
      }

    case ".yaml":
    case ".yml":
      try {
        return parse(file);
      } catch {
        throw new Error("Invalid YAML file");
      }
    default:
      throw Error(`Unsupported file type: ${type}`);
  }
}
