export interface ImgSize {
  w: number;
  h: number;
}

export interface PhotosUpload {
  files: File[];
  formatSize: string[];
  typeConvert: "Original" | "JPG" | "PNG" | "WEBP" | "AVIF";
}
