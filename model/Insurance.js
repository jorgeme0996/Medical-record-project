const mongoose = require("mongoose");

const InsuranceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  policyNumber: {
    type: String,
  }
});

module.exports = mongoose.model("Insurance", InsuranceSchema);
