import mongoose from "mongoose";
import FieldConfigurationSchema from "../Schemas/FieldConfigurationSchema.js";

const VehicleWithoutPoSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vehicle_without_po" },
    componentName: { type: String, default: "Without Purchase Order" },
    componentLabel: { type: String, default: "Vehicle Without PO" },
    HeaderFieldConfigurations: [FieldConfigurationSchema],
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("VehicleWithoutPoConfig", VehicleWithoutPoSchema);
