import { Context } from "elysia";
import { PhotosUpload } from "../models/file.model";
import { handleImageName } from "../util/string";
import {
  createPath,
  writePath,
  readPath,
  removePath,
} from "../util/fileSystem";
import { convertToWebp } from "../util/ffmpeg";
import AdmZip from "adm-zip";
import { compressFile } from "../util/fileCompress";
import { v4 as uuidv4 } from "uuid";

const processPhotos = async ({ body }: Context<{ body: any }>) => {
  console.log(body);
};

export { processPhotos };
