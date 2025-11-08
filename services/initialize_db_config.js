import VehicleWithoutPoConfig from "../Models/VehicleWithoutPoConfig.js";
import VehicleWithPoConfig from "../Models/VehicleWithPoConfig.js";
import OtherVehicle from "../Models/OtherVehicle.js";
import VacantVehicle from "../Models/VacantVehicle.js";

export async function initializeDefaultConfig() {
  const componentId = [
    "vehicle_without_po",
    "vehicle_with_po",
    "other_vehicle",
    "vacant_vehicle",
  ];

  try {
    for (const id of componentId) {
      let Model;
      switch (id) {
        case "vehicle_without_po":
          Model = VehicleWithoutPoConfig;
          break;
        case "vehicle_with_po":
          Model = VehicleWithPoConfig;
          break;
        case "other_vehicle":
          Model = OtherVehicle;
          break;
        case "vacant_vehicle":
          Model = VacantVehicle;
          break;
        case "weight_in":
          Model = WeightInModel;
          break;
        case "weight_out":
          Model = WeightOutModel;
          break;
        default:
          continue;
      }
      const existingConfig = await Model.findOne({ componentId: id });
      if (!existingConfig) {
        const defaultConfig = new Model();
        await defaultConfig.save();
        console.log(`✅ Default config for ${id} initialized.`);
      } else {
        console.log(
          `ℹ️ Config for ${id} already exists. Skipping initialization.`
        );
      }
    }
  } catch (error) {
    console.error(
      `❌ Failed to initialize default config for ${componentId}:`,
      error
    );
    throw error; // Re-throw to halt server startup if critical
  }
}
