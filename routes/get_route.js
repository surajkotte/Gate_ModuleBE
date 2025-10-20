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
    const { id } = req.params;
    if (id === "vehicle_with_po") {
      return AdminController.getVehicleWithPoConfig(req, res);
    } else if (id === "vehicle_without_po") {
      return AdminController.getVehicleWithoutPoConfig(req, res);
    } else {
      return res.status(400).json({ error: "Invalid configuration ID" });
    }
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

export default get_router;
