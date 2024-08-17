const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Company model
const companySchema = new Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Timestamps for createdAt and updatedAt

// Create the model from the schema
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
