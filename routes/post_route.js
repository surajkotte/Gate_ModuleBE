import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import { VehicleEntryController } from "../controllers/VehicleEntryController.js";

const post_router = express.Router();
post_router.post("/admin/:id", (req, res) => {
  const { id } = req.params;
  try {
    return AdminController.updatedConfig(req, res);
  } catch (error) {
    return res.status(400).json({ messageType: "E", message: error?.message });
  }
});
post_router.post("/entry/save", VehicleEntryController.updateVehicleEntry);
export default post_router;
