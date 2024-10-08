import AdmZip from "adm-zip";

const compressFile = (zip: AdmZip, inputPath: string) => {
  try {
    zip.addLocalFolder(inputPath);
  } catch (error) {
    console.log("zip err", error);
  }
};

const zipFile = (zip: AdmZip) => {
  try {
    const zipBuffer = zip.toBuffer();

    return zipBuffer;
  } catch (error) {
    console.log(error);
  }
};

export { compressFile, zipFile };
