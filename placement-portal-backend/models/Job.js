const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  skills: String,
  package: String,
});

module.exports = mongoose.model("Job", jobSchema);