import * as mongodb from "../services/mongodb.services.js";
import VehicleWithPoConfig from "../Models/VehicleWithPoConfig.js";
import VehicleWithoutPoConfig from "../Models/VehicleWithoutPoConfig.js";
import VehicleData from "../Models/VehicleDataModel.js";
import VacentVehicle from "../Models/VacentVehicle.js";
export const VehicleEntryController = {
  async getConfigByContentId(req, res) {
    try {
      const type = req.params.type;
      let config;
      if (type === "vehicle_with_po") {
        config = await mongodb.find(VehicleWithPoConfig, {});
      } else if (type === "vehicle_without_po") {
        config = await mongodb.find(VehicleWithoutPoConfig, {});
        console.log(type);
      } else if (type === "vacent_vehicle") {
        config = await mongodb.find(VacentVehicle, {});
      } else if (type === "other") {
      } else {
        return res
          .status(400)
          .json({ messageType: "E", error: "Invalid type parameter" });
      }
      res.status(200).json({ messageType: "S", data: config });
    } catch (error) {
      console.error("Error fetching configuration by contentId:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },

  async getVehicleWithoutPoConfig(req, res) {
    try {
      const config = await mongodb.find(VehicleWithoutPoConfig, {
        contentId: req.params.contentId,
      });
      res.status(200).json({ messageType: "S", data: config });
    } catch (error) {
      console.error("Error fetching Vehicle Without PO configuration:", error);
      res
        .status(500)
        .json({ messageType: "E", error: "Internal server error" });
    }
  },
  async updateVehicleEntry(req, res) {
    const { data, type } = req.body;
    try {
      let response;
      if (type === "vehicle_with_po") {
        response = await mongodb.insert(VehicleData, {
          userId: "admin",
          entry_type: "with_po",
          status: "entry_draft",
          HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
          ItemFieldConfigurations: data?.ItemFieldConfigurations,
        });
      } else if (type === "vehicle_without_po") {
        response = await mongodb.insert(VehicleData, {
          userId: "admin",
          entry_type: "without_po",
          status: "entry_draft",
          HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
          ItemFieldConfigurations: data?.ItemFieldConfigurations,
        });
      } else if (type === "vacent_vehicle") {
        response = await mongodb.insert(VehicleData, {
          userId: "admin",
          entry_type: "vacent",
          status: "entry_draft",
          HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
          ItemFieldConfigurations: data?.ItemFieldConfigurations,
        });
      }

      res.status(200).json({ messageType: "S", data: response });
    } catch (error) {
      res.status(400).json({
        messageType: "E",
        message: error.message,
      });
    }
  },
};
