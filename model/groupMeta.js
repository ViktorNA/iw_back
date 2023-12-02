const mongoose = require("mongoose");

const groupMetaModel = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    default: "",
  },
  type: {
    required: true,
    type: String,
    default: "public_supergroup",
  },
  id: {
    required: true,
    type: Number,
    unique: true,
  },
  messageCount: {
    required: true,
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("group_meta", groupMetaModel);
