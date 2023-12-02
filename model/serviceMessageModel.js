const mongoose = require("mongoose");

const serviceMessageModel = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: Date,
  },
  actor: {
    required: false,
    type: String,
  },
  actor_id: {
    required: true,
    type: Number,
  },
  actor_type: {
    required: true,
    type: String,
  },
  action: {
    required: true,
    type: String,
  },
  isSelfAction: {
    required: true,
    type: Boolean,
  },
  path: {
    required: true,
    type: String,
  },
  groupId: {
    required: true,
    type: Number,
  },
});

serviceMessageModel.index({ id: 1, groupId: 1 }, { unique: true });

module.exports = mongoose.model("service_message", serviceMessageModel);
