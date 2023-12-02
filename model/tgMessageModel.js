const mongoose = require("mongoose");

const tgMessageModel = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
    unique: false,
  },
  groupId: {
    required: true,
    type: Number,
    unique: false,
  },
  date: {
    required: true,
    type: Date,
  },
  from: {
    required: false,
    type: String,
  },
  from_id: {
    required: true,
    type: Number,
  },
  reply_to_message_id: {
    required: false,
    type: Number,
  },
  text: {
    required: false,
    type: String,
  },
  file: {
    required: false,
    type: Boolean,
  },
});

tgMessageModel.index({ id: 1, groupId: 1 }, { unique: true });
tgMessageModel.index({ from_id: 1, groupId: 1 }, { unique: false });
tgMessageModel.index({ groupId: 1 }, { unique: false });

module.exports = {
  tgMessageModel: mongoose.model("tg_message", tgMessageModel),
};
