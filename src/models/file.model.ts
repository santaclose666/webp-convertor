export interface Img {
  url: string;
  name: string;
  w: number;
  h: number;
  wResize: number;
  hResize: number;
  size: number;
  unit: string;
  type?: string;
  file?: File;
}

export interface PhotosUpload {
  images: Img[];
  typeConvert: string;
}
