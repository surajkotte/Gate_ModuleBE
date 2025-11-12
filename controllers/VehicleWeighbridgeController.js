import * as mongodb from "../services/mongodb.services.js";
import {
  defaultWeightInFieldConfigurations,
  defaultWeightOutFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";
import WeighbridgeModel from "../Models/WeighbridgeModel.js";
import VehicleDataModel from "../Models/VehicleDataModel.js";

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
  async updateWeighbridgeData(req, res) {
    try {
      const { WeighbridgeFieldConfigurations, vehicleDataModelId, id } =
        req?.body;
      const filter = { _id: id };
      const updatePayload = {
        WeighbridgeFieldConfigurations,
        status: "submitted",
      };
      const updatedDocument = await mongodb.updateExisting(WeighbridgeModel, {
        filter: filter,
        update: updatePayload,
      });
      if (updatedDocument) {
        const vehicleData = await mongodb.updateExisting(VehicleDataModel, {
          filter: { _id: vehicleDataModelId },
          update: { status: "unloading" },
        });
        if (vehicleData) {
          res.status(200).json({ messageType: "S", data: vehicleData });
        } else {
          throw new Error("Data updation failed");
        }
      } else {
        throw new Error("Unable to find document");
      }
    } catch (error) {
      res.status(500).json({ messageType: "E", message: error.message });
    }
  },
};

export default WeighbridgeController;
