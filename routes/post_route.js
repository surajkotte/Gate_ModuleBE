import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import { VehicleEntryController } from "../controllers/VehicleEntryController.js";

const post_router = express.Router();
post_router.post("/admin/:id", (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    if (id === "vehicle_with_po") {
      return AdminController.updateVehicleWithPoConfig(req, res);
    } else if (id === "vehicle_without_po") {
      return AdminController.updateVehicleWithoutPoConfig(req, res);
    } else {
      return res
        .status(400)
        .json({ messageType: "E", error: "Invalid configuration ID" });
    }
  } catch (error) {
    return res.status(400).json({ messageType: "E", message: error?.message });
  }
});
post_router.post("/entry/save", VehicleEntryController.updateVehicleEntry);
export default post_router;
