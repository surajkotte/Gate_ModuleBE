import * as mongodb from "../services/mongodb.services.js";
import VehicleWithPoConfig from "../Models/VehicleWithPoConfig.js";
import VehicleWithoutPoConfig from "../Models/VehicleWithoutPoConfig.js";
import VehicleData from "../Models/VehicleDataModel.js";
import VacantVehicle from "../Models/VacantVehicle.js";
import OtherVehicle from "../Models/OtherVehicle.js";
import {
  defaultWeightInFieldConfigurations,
  defaultWeightOutFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";
import WeighbridgeModel from "../Models/WeighbridgeModel.js";

const WeighbridgeController = {
  async getDefaultWeighbridgeConfiguration(req, res) {
    const { type } = req.params;
    try {
      if (type === "IN") {
        return res
          .status(200)
          .json({ messageType: "S", data: defaultWeightInFieldConfigurations });
      } else if (type === "OUT") {
        return res.status(200).json({
          messageType: "S",
          data: defaultWeightOutFieldConfigurations,
        });
      } else {
        throw new Error("Invalid configuration");
      }
    } catch (error) {
      res.status(500).json({ messageType: "E", message: error.message });
    }
  },
  async getDefaultHeader(req, res) {
    try {
      return res.status(200).json({
        messageType: "S",
        data: defaultWeightOutFieldConfigurations,
      });
    } catch (error) {
      res.status(500).json({ messageType: "E", message: error.message });
    }
  },
  async getVehicleData(req, res) {
    try {
      const response = await mongodb.find(WeighbridgeModel, {});
      res.status(200).json({ messageType: "S", data: response });
    } catch (error) {
      res.status(500).json({ messageType: "E", message: error.message });
    }
  },
};

export default WeighbridgeController;
