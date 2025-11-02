import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const VacantVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vacant_vehicle" },
    componentName: { type: String, default: "Vacant Vehicle" },
    componentLabel: { type: String, default: "Vacant Vehicle" },
    HeaderFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultFieldConfigurations,
    },
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("VacantVehicle", VacantVehicleSchema);
