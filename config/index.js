import dotenv from "dotenv";
dotenv.config();

const config = {
  db: {
    uri: process.env.MONGODB_URI,
    options: {},
  },
  server: {
    port: process.env.PORT || 3000,
  },
};

export default config;
