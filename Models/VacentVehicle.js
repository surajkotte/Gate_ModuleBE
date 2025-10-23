import mongoose from "mongoose";
import FieldConfigurationSchema from "../Schemas/FieldConfigurationSchema.js";

const VacentVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vacent_vehicle" },
    componentName: { type: String, default: "Vacent Vehicle" },
    componentLabel: { type: String, default: "Vacent Vehicle" },
    HeaderFieldConfigurations: [FieldConfigurationSchema],
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("VacentVehicle", VacentVehicleSchema);
