const mongoose = require("mongoose");
const schema = mongoose.Schema;

const visitorSchema = schema({
  device: { type: String },
  ipv4: { type: String },
  dateTime: { type: String },
  created_on: { type: String }
});

module.exports = mongoose.model("Visitors", visitorSchema);
