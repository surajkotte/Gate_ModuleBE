import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import { get } from "http";
import { VehicleEntryController } from "../controllers/VehicleEntryController.js";

const get_router = express.Router();

get_router.get(
  "/admin/:id",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    return AdminController.getConfig(req, res);
  }
);

get_router.get("/config/:type/", (req, res, next) => {
  try {
    return VehicleEntryController.getConfigByContentId(req, res);
  } catch (error) {
    console.error("Error in get_router /config/:type/ route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

get_router.get(
  "/default-entries",
  (req, res, next) => {
    next();
  },
  VehicleEntryController.getDefaultEntries
);

get_router.get(
  "/saved-entries",
  (req, res, next) => {
    next();
  },
  VehicleEntryController.getSavedEntries
);

export default get_router;
