import mongoose from "mongoose";
import FieldConfigurationSchema from "../Schemas/FieldConfigurationSchema.js";

const FieldSchema = mongoose.Schema(
  {
    ...FieldConfigurationSchema.obj,
    value: { type: String, default: "" },
  },
  { _id: false }
);

const VehicleDataSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    status: {
      type: String,
      required: true,
      enum: [
        "gate_in",
        "weigh_bridge_in",
        "unloading",
        "gate_out",
        "entry_draft",
        "weigh_bridge_out",
      ],
    },
    entry_type: {
      type: String,
      required: true,
      enum: ["with_po", "without_po", "vacant", "other"],
    },
    HeaderFieldConfigurations: [FieldSchema],
    ItemFieldConfigurations: [[FieldSchema]],
    location: { type: String, default: "" },
    remarks: { type: String, default: "" },
    userId: { type: String, required: true, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("VehicleData", VehicleDataSchema);
