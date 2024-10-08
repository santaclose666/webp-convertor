import sharp from "sharp";
import { ImgSize } from "../models/file.model";

const sharpConvert = (
  buffer: ArrayBuffer,
  size: ImgSize,
  output: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    sharp(buffer)
      .resize(size.w, size.h)
      .toFile(output, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
};
export { sharpConvert };
