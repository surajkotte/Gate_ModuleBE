import mongoose from "mongoose";
import FieldConfigurationSchema from "../Schemas/FieldConfigurationSchema.js";

const OtherVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "other_vehicle" },
    componentName: { type: String, default: "Other Vehicle" },
    componentLabel: { type: String, default: "Other Vehicle" },
    HeaderFieldConfigurations: [FieldConfigurationSchema],
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("OtherVehicle", OtherVehicleSchema);
