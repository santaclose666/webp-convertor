export type imgFormat =
  | "Original"
  | "jpg"
  | "png"
  | "webp"
  | "avif"
  | "gif"
  | "pdf";

export interface ImgSize {
  w: number;
  h: number;
}

export interface PhotosUpload {
  files: File[];
  formatSize: string[];
  typeConvert: imgFormat;
}
