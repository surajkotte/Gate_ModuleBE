import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
  defaultWeightInFieldConfigurations,
  defaultWeightOutFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const VehicleWithoutPoSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vehicle_without_po" },
    componentName: { type: String, default: "Without Purchase Order" },
    componentLabel: { type: String, default: "Vehicle Without PO" },
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

export default mongoose.model("VehicleWithoutPoConfig", VehicleWithoutPoSchema);
