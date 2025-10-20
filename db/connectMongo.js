import mongoose from "mongoose";
import config from "../config/index.js";
import dotenv from "dotenv";
dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(config.db.uri, config.db.options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;
