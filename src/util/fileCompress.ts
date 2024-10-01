import AdmZip from "adm-zip";

const compressFile = (zip: AdmZip, inputPath: string, data: Buffer) => {
  try {
    zip.addFile(inputPath, data);
  } catch (error) {
    console.log("zip err", error);
  }
};

export { compressFile };
