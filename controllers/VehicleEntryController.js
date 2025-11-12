import * as mongodb from "../services/mongodb.services.js";
import VehicleWithPoConfig from "../Models/VehicleWithPoConfig.js";
import VehicleWithoutPoConfig from "../Models/VehicleWithoutPoConfig.js";
import VehicleData from "../Models/VehicleDataModel.js";
import VacantVehicle from "../Models/VacantVehicle.js";
import OtherVehicle from "../Models/OtherVehicle.js";
import { defaultFieldConfigurations } from "../Schemas/FieldConfigurationSchema.js";
import WeighbridgeModel from "../Models/WeighbridgeModel.js";
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
      } else if (type === "vacant_vehicle") {
        config = await mongodb.find(VacantVehicle, {});
      } else if (type === "other") {
        config = await mongodb.find(OtherVehicle, {});
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
      } else if (type === "vacant_vehicle") {
        response = await mongodb.insert(VehicleData, {
          userId: "admin",
          entry_type: "vacant",
          status: "entry_draft",
          HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
          ItemFieldConfigurations: data?.ItemFieldConfigurations,
        });
      } else if (type === "other_vehicle") {
        response = await mongodb.insert(VehicleData, {
          userId: "admin",
          entry_type: "other",
          status: "entry_draft",
          HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
          ItemFieldConfigurations: data?.ItemFieldConfigurations,
        });
      } else {
        return res
          .status(400)
          .json({ messageType: "E", error: "Invalid type parameter" });
      }

      res.status(200).json({ messageType: "S", data: response });
    } catch (error) {
      res.status(400).json({
        messageType: "E",
        message: error.message,
      });
    }
  },
  async submitVehicleEntry(req, res) {
    const { data, type } = req.body;
    try {
      let response;
      const typeMap = {
        vehicle_with_po: { entryType: "with_po", model: VehicleWithPoConfig },
        vehicle_without_po: {
          entryType: "without_po",
          model: VehicleWithoutPoConfig,
        },
        vacant_vehicle: { entryType: "vacant", model: VacantVehicle },
        other_vehicle: { entryType: "other", model: OtherVehicle },
      };
      const choosenType = typeMap[type];

      if (choosenType) {
        const readConfig = await mongodb.find(choosenType?.model, {});
        if (readConfig) {
          const isWeighbridgeInEnabled = readConfig[0]?.isWeighbridgeInEnabled;

          if (isWeighbridgeInEnabled) {
            const weighBridgeFields =
              readConfig[0]?.WeighbridgeInFieldConfigurations || [];
            const updatedWeighbridgeFields = weighBridgeFields?.map(
              (wbField) => {
                const match = data?.HeaderFieldConfigurations?.find(
                  (h) => h.fieldName === wbField.fieldName
                );

                return {
                  ...wbField,
                  value: match ? match.value || "" : "",
                };
              }
            );

            const response1 = await mongodb.insert(VehicleData, {
              userId: "admin",
              entry_type: choosenType?.entryType,
              status: "weigh_bridge_in",
              HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
              ItemFieldConfigurations: data?.ItemFieldConfigurations?.flat(),
            });
            if (response1) {
              console.log(response1);
              const response = await mongodb.insert(WeighbridgeModel, {
                userId: "admin",
                entry_type: choosenType?.entryType,
                weighbridgeFlow: "weigh_bridge_in",
                status: "draft",
                WeighbridgeFieldConfigurations: updatedWeighbridgeFields,
                vehicleDataModelId: response1?._id,
              });
              if (response1) {
                res.status(200).json({ messageType: "S", data: response1 });
              } else {
                throw new Error(
                  "Unable to save entries.Please contact system administrator"
                );
              }
            } else {
              return res.status(400).json({
                messageType: "E",
                error: "Unable to update data, Plase try later",
              });
            }
          } else {
            const response = await mongodb.insert(VehicleData, {
              userId: "admin",
              entry_type: "with_po",
              status: "unloading",
              HeaderFieldConfigurations: data?.HeaderFieldConfigurations,
              ItemFieldConfigurations: data?.ItemFieldConfigurations,
            });
            res.status(200).json({ messageType: "S", data: response });
          }
        } else {
          return res
            .status(400)
            .json({ messageType: "E", error: "No configuration found" });
        }
      } else {
        return res
          .status(400)
          .json({ messageType: "E", error: "Invalid type parameter" });
      }
      res.status(200).json({ messageType: "S", data: response });
    } catch (error) {
      res.status(400).json({
        messageType: "E",
        message: error.message,
      });
    }
  },
  async getDefaultEntries(req, res) {
    try {
      const defaultHeaderFields = defaultFieldConfigurations;
      res.status(200).json({ messageType: "S", data: defaultHeaderFields });
    } catch (error) {
      console.error("Error fetching default vehicle entries:", error);
      res
        .status(500)
        .json({ messageType: "E", message: "Internal server error" });
    }
  },
  async getSavedEntries(req, res) {
    try {
      const savedEntries = await mongodb.find(VehicleData, {
        status: "entry_draft",
      });
      res.status(200).json({ messageType: "S", data: savedEntries });
    } catch (error) {
      console.error("Error fetching saved vehicle entries:", error);
      res
        .status(500)
        .json({ messageType: "E", message: "Internal server error" });
    }
  },
  async getSavedEntries(req, res) {
    try {
      const savedEntries = await mongodb.find(VehicleData, {});
      res.status(200).json({ messageType: "S", data: savedEntries });
    } catch (error) {
      console.error("Error fetching saved vehicle entries:", error);
      res
        .status(500)
        .json({ messageType: "E", message: "Internal server error" });
    }
  },
  async getSavedEntryById(req, res) {
    try {
      const { id } = req.params;
      const savedEntry = await mongodb.find(VehicleData, { _id: id });
      res.status(200).json({ messageType: "S", data: savedEntry });
    } catch (error) {
      console.error("Error fetching saved vehicle entry by ID:", error);
      res
        .status(500)
        .json({ messageType: "E", message: "Internal server error" });
    }
  },
};
