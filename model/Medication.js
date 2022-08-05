const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dosis: {
    type: String
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model("Medication", MedicationSchema);
