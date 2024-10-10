import sharp from "sharp";
import { imgFormat, ImgSize } from "../models/file.model";
import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import { getRandomID } from "./string";
import { removePath } from "./fileSystem";

const imgConvert = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string,
  originExt: imgFormat,
  typeConvert: imgFormat
): Promise<void> => {
  try {
    if (typeConvert === "jpg") {
      await toJPG(buffer, size, output);
    } else if (typeConvert === "png") {
      await toPNG(buffer, size, output);
    } else if (typeConvert === "webp") {
      await toWEBP(buffer, size, output, originExt);
    } else if (typeConvert === "avif") {
      await toAVIF(buffer, size, output);
    } else if (typeConvert === "gif") {
      await toGIF(buffer, size, output, originExt);
    } else if (typeConvert === "pdf") {
      await toPDF(buffer, size, output);
    } else {
      await toDefault(buffer, size, output);
    }
  } catch (error) {
    console.log(error);
  }
};

const toPDF = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  try {
    const { w, h } = size;
    const newName = `${getRandomID(4)}.png`;
    const tempOutput = `./atemp/${newName}`;

    await toPNG(buffer, size, tempOutput);

    const doc = new PDFDocument({ size: [h, w] });

    const streamOutput = createWriteStream(output);
    doc.pipe(streamOutput);

    doc.image(tempOutput, {
      fit: [w, h],
      align: "center",
      valign: "center",
    });

    doc.end();
    removePath(tempOutput);
  } catch (error) {
    console.log(error);
  }
};

const toJPG = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  await sharp(buffer)
    .resize({ width: size.w, height: size.h })
    .jpeg()
    .toFile(output);
};

const toPNG = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  await sharp(buffer)
    .resize({ width: size.w, height: size.h })
    .png()
    .toFile(output);
};

const toWEBP = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string,
  originExt: imgFormat
) => {
  const isGif = originExt === "gif";

  await sharp(buffer, { animated: isGif })
    .resize({ width: size.w, height: size.h })
    .webp({ effort: isGif ? 6 : 1 })
    .toFile(output);
};

const toAVIF = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  await sharp(buffer)
    .resize({ width: size.w, height: size.h })
    .avif()
    .toFile(output);
};

const toGIF = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string,
  originExt: imgFormat
) => {
  const isWebp = originExt === "webp";

  await sharp(buffer, { animated: isWebp })
    .resize({ width: size.w, height: size.h })
    .gif()
    .toFile(output);
};

const toDefault = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string
) => {
  await sharp(buffer).resize({ width: size.w, height: size.h }).toFile(output);
};

export { imgConvert };
