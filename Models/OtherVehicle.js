import mongoose from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const OtherVehicleSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "other_vehicle" },
    componentName: { type: String, default: "Other Vehicle" },
    componentLabel: { type: String, default: "Other Vehicle" },
    HeaderFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultFieldConfigurations,
    },
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("OtherVehicle", OtherVehicleSchema);
