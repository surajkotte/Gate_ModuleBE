import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
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
    WeighbridgeInFieldConfigurations: [FieldConfigurationSchema],
    WeighbridgeOutFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("VacantVehicle", VacantVehicleSchema);
