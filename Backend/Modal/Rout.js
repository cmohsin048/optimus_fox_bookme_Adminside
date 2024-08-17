const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  fromCity: {
    type: String,
    required: true,
  },
  toCity: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
