const mongoose = require("mongoose");

const vkTokenModel = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
  isPrivate: {
    type: Boolean,
    required: false,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    default: "+0",
  },
});

module.exports = mongoose.model("vk_token", vkTokenModel);
