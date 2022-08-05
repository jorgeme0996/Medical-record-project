const mongoose = require("mongoose");

const AlergieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model("Alergie", AlergieSchema);
