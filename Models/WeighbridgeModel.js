import mongoose from "mongoose";
import FieldConfigurationSchema from "../Schemas/FieldConfigurationSchema.js";
import { type } from "os";

const FieldSchema = mongoose.Schema(
  {
    ...FieldConfigurationSchema.obj,
    value: { type: String, default: "" },
  },
  { _id: false }
);

const WeighbridgeSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    weighbridgeFlow: {
      type: String,
      required: true,
      enum: ["weigh_bridge_in", "weigh_bridge_out"],
    },
    status: {
      type: String,
      required: true,
      enum: ["saved", "submitted", "draft"],
    },
    entry_type: {
      type: String,
      required: true,
      enum: ["with_po", "without_po", "vacant", "other"],
    },
    WeighbridgeFieldConfigurations: [FieldSchema],
    location: { type: String, default: "" },
    remarks: { type: String, default: "" },
    userId: { type: String, required: true, default: "admin" },
    vehicleDataModelId: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("WeighbridgeModel", WeighbridgeSchema);
