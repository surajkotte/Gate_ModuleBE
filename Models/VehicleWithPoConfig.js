import mongoose, { Mongoose } from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const VehicleWithPoSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vehicle_with_po" },
    componentName: { type: String, default: "With Purchase Order" },
    componentLabel: { type: String, default: "Vehicle With PO" },
    HeaderFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultFieldConfigurations,
    },
    ItemFieldConfigurations: [FieldConfigurationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("VehicleWithPoConfig", VehicleWithPoSchema);
