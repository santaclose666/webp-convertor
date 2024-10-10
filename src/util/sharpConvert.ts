import sharp from "sharp";
import { imgFormat, ImgSize } from "../models/file.model";

const sharpConvert = async (
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
    } else {
      await toDefault(buffer, size, output);
    }
  } catch (error) {
    console.log(error);
  }
};

const toJPG = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  await sharp(buffer).resize(size.w, size.h).jpeg().toFile(output);
};

const toPNG = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  await sharp(buffer).resize(size.w, size.h).png().toFile(output);
};

const toWEBP = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string,
  originExt: imgFormat
) => {
  const isGif = originExt === "gif";

  await sharp(buffer, { animated: isGif })
    .resize(size.w, size.h)
    .webp({ effort: isGif ? 6 : 1 })
    .toFile(output);
};

const toAVIF = async (buffer: ArrayBuffer, size: ImgSize, output: string) => {
  await sharp(buffer).resize(size.w, size.h).avif().toFile(output);
};

const toGIF = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string,
  originExt: imgFormat
) => {
  const isWebp = originExt === "webp";

  await sharp(buffer, { animated: isWebp })
    .resize(size.w, size.h)
    .gif()
    .toFile(output);
};

const toDefault = async (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string
) => {
  await sharp(buffer).resize(size.w, size.h).toFile(output);
};

export { sharpConvert };
