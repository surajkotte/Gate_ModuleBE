import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
  defaultWeightInFieldConfigurations,
  defaultWeightOutFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const VacantVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vacant_vehicle" },
    componentName: { type: String, default: "Vacant Vehicle" },
    componentLabel: { type: String, default: "Vacant Vehicle" },
    isWeighbridgeInEnabled: { type: Boolean, default: false },
    isWeighbridgeOutEnabled: { type: Boolean, default: false },
    HeaderFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultFieldConfigurations,
    },
    ItemFieldConfigurations: [FieldConfigurationSchema],
    WeighbridgeInFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultWeightInFieldConfigurations,
    },
    WeighbridgeOutFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultWeightOutFieldConfigurations,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VacantVehicle", VacantVehicleSchema);
