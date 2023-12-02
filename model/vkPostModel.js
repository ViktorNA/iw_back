const mongoose = require("mongoose");

const vkPostModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: null,
  },
  from_id: {
    type: Number,
    required: false,
    default: null,
  },
});

vkPostModel.index({ id: 1, groupId: 1 }, { unique: true });
vkPostModel.index({ from_id: 1 }, { unique: false });
vkPostModel.index({ groupId: 1 }, { unique: false });

module.exports = mongoose.model("vk_post", vkPostModel);
