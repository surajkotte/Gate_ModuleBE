import mongoose from "mongoose";

const FieldConfigurationSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    fieldName: { type: String, required: true },
    fieldType: { type: String, required: true },
    fieldLabel: { type: String, required: true },
    isRequired: { type: Boolean, default: false },
    width: { type: String, enum: ["full", "flex"], default: "full" },
    icon: { type: String, default: null },
    sequence: { type: Number, default: 0, required: true },
    options: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default FieldConfigurationSchema;
