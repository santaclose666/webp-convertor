import path from "path";
import { unlink, readFile, rm } from "node:fs/promises";

const createPath = (folderName: string, fileName: string) => {
  try {
    const filePath = path.resolve(folderName, fileName);

    return filePath;
  } catch (error) {
    console.log("err", error);
    return "";
  }
};

const writePath = async (inputPath: string, data: any) => {
  try {
    await Bun.write(inputPath, await data);
  } catch (error) {
    console.log("err", error);
  }
};

const readPath = async (inputPath: string) => {
  try {
    const res = await readFile(inputPath);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const removePath = (inputPath: string) => {
  try {
    unlink(inputPath);
  } catch (error) {
    console.log(error);
  }
};

const removeDirectory = async (directoryPath: string) => {
  try {
    await rm(directoryPath, { recursive: true, force: true });
  } catch (error) {
    console.error(`err:`, error);
  }
};

export { createPath, writePath, removePath, readPath, removeDirectory };
