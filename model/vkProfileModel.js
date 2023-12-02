const mongoose = require("mongoose");

const vkProfileModel = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  record_date: {
    type: Date,
    required: true,
  },
  dump_version: {
    type: Number,
    required: true,
    default: 1,
  },
  first_name: {
    type: String,
    required: true,
    default: "",
  },
  last_name: {
    type: String,
    required: false,
    default: "",
  },
  b_day: {
    type: Number,
    required: false,
    default: null,
  },
  b_month: {
    type: Number,
    required: false,
    default: null,
  },
  b_year: {
    type: Number,
    required: false,
    default: null,
  },
  city: {
    type: String,
    required: false,
    default: null,
  },
  country: {
    type: String,
    required: false,
    default: null,
  },
  profile_photo: {
    type: String,
    required: false,
    default: null,
  },
  home_town: {
    type: String,
    required: false,
    default: null,
  },
  domain: {
    type: String,
    required: false,
    default: null,
  },
  contact: {
    type: String,
    required: false,
    default: null,
  },
  site: {
    type: String,
    required: false,
    default: null,
  },
  occupation: {
    type: String,
    required: false,
    default: null,
  },
  status: {
    type: String,
    required: false,
    default: null,
  },
  about: {
    type: String,
    required: false,
    default: null,
  },
});

vkProfileModel.index({ user_id: 1, dump_version: 1 }, { unique: true });
vkProfileModel.index({ user_id: 1 });

module.exports = mongoose.model("vk_profile", vkProfileModel);
