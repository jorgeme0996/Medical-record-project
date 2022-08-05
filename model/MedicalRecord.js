const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema({
  hasInsurance: {
    type: Boolean,
    default: false,
  },
  insuranceData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Insurance",
  },
  allergies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alergie",
    },
  ],
  medications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
    },
  ],
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
