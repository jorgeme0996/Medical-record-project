const mongoose = require("mongoose");

const EmergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String
  },
  isUser: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("EmergencyContact", EmergencyContactSchema);