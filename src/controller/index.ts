import { Elysia } from "elysia";
import { processPhotos } from "./photos.controller";
import { servertestting } from "./servertesting";

const photosController = (app: Elysia) => {
  app.post("processPhotos", processPhotos);
  app.get("/", servertestting);
};

export { photosController };
