const mongoose = require("mongoose");

const vkEduModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  year_from: {
    type: Number,
    required: false,
    default: null,
  },
  year_to: {
    type: Number,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  edu_type: {
    type: Number,
    required: true,
    default: 0,
  },
});

vkEduModel.index({ id: 1, user_id: 1, edu_type: 1 }, { unique: true });

module.exports = mongoose.model("vk_edu", vkEduModel);
