import { v4 as uuidv4 } from "uuid";
import { imgFormat } from "../models/file.model";

const getRandomID = (limit: number = 6) => {
  return uuidv4().slice(0, limit);
};

const getExtensionFile = (name: string, char: string = ".") => {
  const exts = name.split(char);

  return exts[exts.length - 1] as imgFormat;
};

export { getRandomID, getExtensionFile };
