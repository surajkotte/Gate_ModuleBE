import * as mongodb from "../services/mongodb.services.js";
import VehicleWithPoConfig from "../Models/VehicleWithPoConfig.js";
import VehicleWithoutPoConfig from "../Models/VehicleWithoutPoConfig.js";
import OtherVehicle from "../Models/OtherVehicle.js";
import VacantVehicle from "../Models/VacantVehicle.js";

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

  async getConfig(req, res) {
    const { id } = req.params;
    try {
      let config;
      if (id === "vehicle_with_po") {
        config = await mongodb.get(VehicleWithPoConfig, {});
      } else if (id === "vehicle_without_po") {
        config = await mongodb.get(VehicleWithoutPoConfig, {});
      } else if (id === "other") {
        config = await mongodb.get(OtherVehicle, {});
      } else if (id === "vacant_vehicle") {
        config = await mongodb.get(VacantVehicle, {});
      } else {
        return res
          .status(400)
          .json({ messageType: "E", error: "Invalid configuration ID" });
      }
      res.status(200).json({ messageType: "S", data: config });
    } catch (error) {
      console.error("Error fetching Other Vehicle configuration:", error);
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
  async updatedConfig(req, res) {
    const { id } = req.params;
    try {
      if (id === "vehicle_with_po") {
        const { HeaderFieldConfigurations, ItemFieldConfigurations } = req.body;
        const updatedConfig = await mongodb.update(VehicleWithPoConfig, {
          filter: { componentId: "vehicle_with_po" },
          update: { HeaderFieldConfigurations, ItemFieldConfigurations },
        });
        return res.status(200).json({ messageType: "S", data: updatedConfig });
      } else if (id === "vehicle_without_po") {
        const { HeaderFieldConfigurations, ItemFieldConfigurations } = req.body;
        const updatedConfig = await mongodb.update(VehicleWithoutPoConfig, {
          filter: { componentId: "vehicle_without_po" },
          update: { HeaderFieldConfigurations, ItemFieldConfigurations },
        });
        return res.status(200).json({ messageType: "S", data: updatedConfig });
      } else if (id === "other_vehicle") {
        const { HeaderFieldConfigurations, ItemFieldConfigurations } = req.body;
        const updatedConfig = await mongodb.update(OtherVehicle, {
          filter: { componentId: "other_vehicle" },
          update: { HeaderFieldConfigurations, ItemFieldConfigurations },
        });
        return res.status(200).json({ messageType: "S", data: updatedConfig });
      } else if (id === "vacant_vehicle") {
        const { HeaderFieldConfigurations, ItemFieldConfigurations } = req.body;
        const updatedConfig = await mongodb.update(VacantVehicle, {
          filter: { componentId: "vacant_vehicle" },
          update: { HeaderFieldConfigurations, ItemFieldConfigurations },
        });
        return res.status(200).json({ messageType: "S", data: updatedConfig });
      } else {
        return res
          .status(400)
          .json({ messageType: "E", error: "Invalid configuration ID" });
      }
    } catch (error) {
      console.error("Error updating configuration:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },
};
