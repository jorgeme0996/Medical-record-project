const mongoose = require("mongoose");
const { MongoUrl } = require("./constants");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;