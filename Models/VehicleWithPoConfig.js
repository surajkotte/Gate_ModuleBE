import mongoose, { Mongoose } from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
} from "../Schemas/FieldConfigurationSchema.js";

const VehicleWithPoSchema = new mongoose.Schema(
  {
    componentId: { type: String, default: "vehicle_with_po" },
    componentName: { type: String, default: "With Purchase Order" },
    componentLabel: { type: String, default: "Vehicle With PO" },
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

export default mongoose.model("VehicleWithPoConfig", VehicleWithPoSchema);
