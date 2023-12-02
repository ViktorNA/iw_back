const mongoose = require("mongoose");

const chatUserIdGroupConstr = new mongoose.Schema({
  chatUserId: {
    required: true,
    type: Number,
    unique: false,
  },
  groupId: {
    required: true,
    type: Number,
  },
});

chatUserIdGroupConstr.index({ chatUserId: 1, groupId: 1 }, { unique: true });

module.exports = mongoose.model(
  "chat_user_id_group_constr",
  chatUserIdGroupConstr
);
