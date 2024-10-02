import { Context } from "elysia";
import { PhotosUpload } from "../models/file.model";
import { handleImageName } from "../util/string";
import {
  createPath,
  writePath,
  readPath,
  removeDirectory,
  removePath,
} from "../util/fileSystem";
import { convertToWebp } from "../util/ffmpeg";
import AdmZip from "adm-zip";
import { compressFile } from "../util/fileCompress";
import { v4 as uuidv4 } from "uuid";

const processPhotos = async ({
  body: { images },
}: Context<{ body: PhotosUpload }>) => {
  try {
    const zip = new AdmZip();
    const tempPath = uuidv4();

    for (const image of images) {
      const fileName = handleImageName(image.name);

      const outputName = `${fileName}.webp`;

      const inputPath = createPath(tempPath, image.name);
      const outputPath = createPath(tempPath, outputName);

      const buffer = await image.arrayBuffer();
      await writePath(inputPath, buffer);

      await convertToWebp(inputPath, outputPath);

      const content = await readPath(outputPath);
      if (content) {
        compressFile(zip, outputName, content);
      }

      removePath(inputPath);
    }

    // removeDirectory(tempPath);
    // const zipBuffer = zip.toBuffer();

    // set.headers["Content-Type"] = "application/zip";
    // set.headers["Content-Disposition"] =
    //   "attachment; filename=converted_images.zip";

    // return zipBuffer;
  } catch (error) {
    console.log("err", error);
  }
};

export { processPhotos };
