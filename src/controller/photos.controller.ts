import { Context } from "elysia";
import { PhotosUpload } from "../models/file.model";
import { handleImageName } from "../util/string";

const processPhotos = async ({
  body: { image },
}: Context<{ body: PhotosUpload }>) => {
  let imgArr = [];

  for (const { name } of image) {
    const fileName = handleImageName(name);

    imgArr.push(fileName);
  }

  console.log(imgArr);
};

export default {
  processPhotos,
};
