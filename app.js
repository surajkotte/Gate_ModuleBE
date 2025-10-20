import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import post_router from "./routes/post_route.js";
import get_router from "./routes/get_route.js";

export const createApp = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.json());
  const corsOptions = {
    origin: "*",
    // credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-lti-issuer",
      "X-Requested-With",
    ],
  };
  app.use(cors(corsOptions));

  app.use("/api", post_router);
  app.use("/api", get_router);
  return app;
};
