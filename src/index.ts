import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { photosController } from "./controller";

const app = new Elysia();

photosController(app);

app
  .use(
    cors({
      origin: Bun.env.CLIENT_URL,
      methods: ["GET", "POST"],
    })
  )
  .listen(Number(Bun.env.SERVER_PORT), () => {
    console.log("Server is running");
  });
