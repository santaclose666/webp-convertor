import { Context } from "elysia";
import { imgFormat, ImgSize, PhotosUpload } from "../models/file.model";
import AdmZip from "adm-zip";
import { compressFile, zipFile } from "../util/fileCompress";
import { imgConvert } from "../util/sharpConvert";
import { getExtensionFile, getRandomID } from "../util/string";
import { createPath, removePath } from "../util/fileSystem";
import { checkIsArray } from "../util/array";

const processPhotos = async ({
  body: { formatSize, files, typeConvert },
}: Context<{ body: PhotosUpload }>) => {
  formatSize = checkIsArray(formatSize) ? formatSize : [formatSize];
  files = checkIsArray(files) ? files : [files];

  const outputFolder = `./${getRandomID(6)}`;
  await createPath(outputFolder);

  try {
    const zip = new AdmZip();
    const resizeImg: ImgSize[] = formatSize.map((item) => JSON.parse(item));

    for (let idx in files) {
      let name = files[idx].name;
      const extension: imgFormat = getExtensionFile(name);

      if (typeConvert !== "Original") {
        name = name.replace(extension, typeConvert);
      }

      const output = `${outputFolder}/${name}`;

      const arrBuffer = await files[idx].arrayBuffer();

      await imgConvert(
        arrBuffer,
        resizeImg[idx],
        output,
        extension,
        typeConvert
      );
    }

    compressFile(zip, outputFolder);

    const zipFolder = zipFile(zip);

    return new Response(zipFolder, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="output.zip"',
        "Content-Length": zipFolder!.length.toString(),
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    // await removePath(outputFolder);
  }
};

export { processPhotos };
