import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
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
    WeighbridgeInFieldConfigurations: [FieldConfigurationSchema],
    WeighbridgeOutFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("OtherVehicle", OtherVehicleSchema);
