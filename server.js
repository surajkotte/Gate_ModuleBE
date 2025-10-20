import connectMongo from "./db/connectMongo.js";
import { createApp } from "./app.js";
import config from "./config/index.js";
(async () => {
  try {
    await connectMongo();
    const app = createApp();
    app.listen(config.server.port, () => {
      console.log(
        `Server is running on http://localhost:${config.server.port}`
      );
    });
  } catch (error) {
    console.error("Error during MongoDB connection:", error);
  }
})();
