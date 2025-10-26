import mongoose from "mongoose";
import FieldConfigurationSchema from "../Schemas/FieldConfigurationSchema.js";

const VacantVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vacant_vehicle" },
    componentName: { type: String, default: "Vacant Vehicle" },
    componentLabel: { type: String, default: "Vacant Vehicle" },
    HeaderFieldConfigurations: [FieldConfigurationSchema],
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("VacantVehicle", VacantVehicleSchema);
