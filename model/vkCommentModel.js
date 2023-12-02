const mongoose = require("mongoose");

const vkCommentModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: null,
  },
  from_id: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

vkCommentModel.index({ id: 1, postId: 1, groupId: 1 }, { unique: true });
vkCommentModel.index({ from_id: 1 }, { unique: false });

module.exports = mongoose.model("vk_comments", vkCommentModel);
