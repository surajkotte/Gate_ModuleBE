import * as mongodb from "../services/mongodb.services.js";
import VehicleWithPoConfig from "../Models/VehicleWithPoConfig.js";
import VehicleWithoutPoConfig from "../Models/VehicleWithoutPoConfig.js";

export const AdminController = {
  async getVehicleWithPoConfig(req, res) {
    try {
      const config = await mongodb.get(VehicleWithPoConfig, {});
      res.status(200).json({ messageType: "S", data: config });
    } catch (error) {
      console.error("Error fetching Vehicle With PO configuration:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },

  async getVehicleWithoutPoConfig(req, res) {
    try {
      const config = await mongodb.get(VehicleWithoutPoConfig, {});
      res.status(200).json({ messageType: "S", data: config });
    } catch (error) {
      console.error("Error fetching Vehicle Without PO configuration:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },

  async updateVehicleWithPoConfig(req, res) {
    try {
      const { HeaderFieldConfigurations, ItemFieldConfigurations } = req.body;
      const updatedConfig = await mongodb.update(VehicleWithPoConfig, {
        filter: { componentId: "vehicle_with_po" },
        update: { HeaderFieldConfigurations, ItemFieldConfigurations },
      });
      res.status(200).json({ messageType: "S", data: updatedConfig });
    } catch (error) {
      console.error("Error updating Vehicle With PO configuration:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },

  async updateVehicleWithoutPoConfig(req, res) {
    try {
      const { HeaderFieldConfigurations, ItemFieldConfigurations } = req.body;
      const updatedConfig = await mongodb.update(VehicleWithoutPoConfig, {
        filter: { componentId: "vehicle_without_po" },
        update: { HeaderFieldConfigurations, ItemFieldConfigurations },
      });
      res.status(200).json({ messageType: "S", data: updatedConfig });
    } catch (error) {
      console.error("Error updating Vehicle Without PO configuration:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },
};
