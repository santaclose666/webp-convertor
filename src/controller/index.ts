import { Elysia } from "elysia";
import ptController from "./photos.controller";

const photosController = (app: Elysia) => {
  app.post("processPhotos", ptController.processPhotos);
};

export { photosController };
