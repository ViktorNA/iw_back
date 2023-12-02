const mongoose = require("mongoose");

const vkGroupIdModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  isLoaded: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false,
  },
  offset: {
    type: Number,
    required: true,
    default: 0,
  },
  isProcessing: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
});

vkGroupIdModel.index({ groupId: 1 }, { unique: false });

module.exports = mongoose.model("vk_group_id", vkGroupIdModel);
