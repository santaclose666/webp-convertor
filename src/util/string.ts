import { v4 as uuidv4 } from "uuid";

const getRandomID = (limit: number = 6) => {
  return uuidv4().slice(0, limit);
};

const getExtensionFile = (name: string, char: string = ".") => {
  const exts = name.split(char);

  return exts[exts.length - 1];
};

export { getRandomID, getExtensionFile };
