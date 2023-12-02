const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
  status: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("task", taskModel);
