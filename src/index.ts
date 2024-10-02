import { Elysia } from "elysia";
import { photosController } from "./controller";

const app = new Elysia();

photosController(app);

app.listen(6000, () => {
  console.log("Server is running");
});
