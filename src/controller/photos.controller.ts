import { Context } from "elysia";
import { PhotosUpload } from "../models/file.model";
import { handleImageName } from "../util/string";
import {
  createPath,
  writePath,
  readPath,
  removeDirectory,
} from "../util/fileSystem";
import { convertToWebp } from "../util/ffmpeg";
import AdmZip from "adm-zip";
import { compressFile } from "../util/fileCompress";

const tempPath = "tempUploads";

const processPhotos = async ({
  body: { images },
  set,
}: Context<{ body: PhotosUpload }>) => {
  try {
    const zip = new AdmZip();

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
    }

    removeDirectory(tempPath);
    const zipBuffer = zip.toBuffer();

    set.headers["Content-Type"] = "application/zip";
    set.headers["Content-Disposition"] =
      "attachment; filename=converted_images.zip";

    return zipBuffer;
  } catch (error) {
    console.log("err", error);
  }
};

export { processPhotos };
