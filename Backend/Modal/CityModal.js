const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Company model
const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
const Company = mongoose.model("Cities", CitySchema);
module.exports = Company;
