import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
  defaultWeightInFieldConfigurations,
  defaultWeightOutFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const OtherVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "other_vehicle" },
    componentName: { type: String, default: "Other Vehicle" },
    componentLabel: { type: String, default: "Other Vehicle" },
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

export default mongoose.model("OtherVehicle", OtherVehicleSchema);
