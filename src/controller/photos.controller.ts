import { Context } from "elysia";
import { ImgSize, PhotosUpload } from "../models/file.model";
import AdmZip from "adm-zip";
import { compressFile, zipFile } from "../util/fileCompress";
import { sharpConvert } from "../util/sharpConvert";
import { getExtensionFile, getRandomID } from "../util/string";
import { createDirectory, removeDirectory } from "../util/fileSystem";

const processPhotos = async ({
  body: { formatSize, files, typeConvert },
}: Context<{ body: PhotosUpload }>) => {
  // formatSize = checkIsArray(formatSize) ? formatSize : [formatSize];
  // files = checkIsArray(files) ? files : [files];

  const outputFolder = `./${getRandomID(8)}`;
  await createDirectory(outputFolder);

  try {
    const zip = new AdmZip();
    const resizeImg: ImgSize[] = formatSize.map((item) => JSON.parse(item));

    for (let idx in files) {
      let name = files[idx].name;

      if (typeConvert !== "Original") {
        const extension = getExtensionFile(name);
        name = name.replace(extension, typeConvert.toLocaleLowerCase());
      }

      const output = `${outputFolder}/${name}`;

      const arrBuffer = await files[idx].arrayBuffer();

      await sharpConvert(arrBuffer, resizeImg[idx], output);
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
    await removeDirectory(outputFolder);
  }
};

export { processPhotos };
