import { rm, mkdir } from "node:fs/promises";

const createDirectory = async (directoryPath: string) => {
  try {
    await mkdir(directoryPath);
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

export { removeDirectory, createDirectory };
