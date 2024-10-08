import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { photosController } from "./controller";

const app = new Elysia();

photosController(app);

app
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    })
  )
  .listen(4000, () => {
    console.log("http://localhost:4000");
  });
