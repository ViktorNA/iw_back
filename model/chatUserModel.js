const mongoose = require("mongoose");

const chatUserModel = new mongoose.Schema({
  names: {
    required: true,
    type: [String],
  },
  id: {
    required: true,
    type: Number,
    unique: true,
  },
  chatIds: {
    required: true,
    type: [String],
  },
});

module.exports = mongoose.model("chat_user", chatUserModel);
