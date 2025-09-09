const express = require("express");
const EntryRouter = express.Router();
const FS = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

EntryRouter.post("/entries", (req, res) => {
  let entry = req.body;
  entry["status"] = 1;
  entry["inTime"] = new Date().toISOString();
  entry["outTime"] = "";
  entry["outDate"] = "";
  entry["outGate"] = "";
  console.log("Received entry:", entry);
  try {
    if (!entry) {
      return new Error("Entry is required");
    }
    if (!entry.transporterName || !entry.vehicleNo) {
      return new Error("Entry mandatory fieldsrequired");
    }
    const uniqueId = uuidv4();
    entry["vehicleId"] = uniqueId;
    const directory = path.join(__dirname, "../data/gateentries.json");
    if (!FS.existsSync(directory)) {
      FS.writeFileSync(directory, JSON.stringify([]));
    }
    console.log("Writing entry to file:", directory);
    let entries = [];
    if (FS.readFileSync(directory)) {
      entries = JSON.parse(FS.readFileSync(directory));
    }

    entries.push(entry);
    FS.writeFileSync(directory, JSON.stringify(entries));
    res.status(200).json({
      messageType: "S",
      data: "entry created successfully",
    });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(400).json({
      messageType: "E",
      message: error.message || "An error occurred",
    });
  }
});

EntryRouter.get("/entries", (req, res) => {
  const directory = path.join(__dirname, "../data/gateentries.json");
  if (!FS.existsSync(directory)) {
    return res.status(404).json({
      messageType: "E",
      message: "No entries found",
    });
  }
  try {
    const entries = JSON.parse(FS.readFileSync(directory));
    res.status(200).json({
      messageType: "S",
      data: entries,
    });
  } catch (error) {
    console.error("Error reading entries:", error);
    res.status(500).json({
      messageType: "E",
      message: "An error occurred while reading entries",
    });
  }
});

module.exports = EntryRouter;
