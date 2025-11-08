import mongoose, { Mongoose } from "mongoose";
import FieldConfigurationSchema, {
  defaultFieldConfigurations,
  defaultItemFieldConfigurations,
  defaultWeightInFieldConfigurations,
  defaultWeightOutFieldConfigurations,
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
    ItemFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultItemFieldConfigurations,
    },
    WeighbridgeInFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultWeightInFieldConfigurations,
    },
    WeighbridgeOutFieldConfigurations: {
      type: [FieldConfigurationSchema],
      default: defaultWeightOutFieldConfigurations,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VehicleWithPoConfig", VehicleWithPoSchema);
