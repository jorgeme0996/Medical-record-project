const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "NoName",
  },
  lastName: {
    type: String,
    default: "NoLastName",
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Ingrese un correo electrónico válido",
    ],
    default: "nomail@nomail.com",
  },
  phone: {
    type: String,
    default: "NoPhone",
  },
  dateBirth: {
    type: String,
    default: "00-00-0000",
  },
  weight: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  accountAddress: {
    type: String,
    require: true
  },
  emergencyContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmergencyContact",
  },
  addres: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
