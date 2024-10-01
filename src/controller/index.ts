import { Elysia } from "elysia";
import { processPhotos } from "./photos.controller";

const photosController = (app: Elysia) => {
  app.post("processPhotos", processPhotos);
};

export { photosController };
