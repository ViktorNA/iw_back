const mongoose = require("mongoose");

const chatUserIdUsernameConstr = new mongoose.Schema({
  chatUserId: {
    required: true,
    type: Number,
  },
  chatUserName: {
    required: false,
    type: String,
  },
});

chatUserIdUsernameConstr.index(
  { chatUserId: 1, chatUserName: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "chat_user_id_username_constr",
  chatUserIdUsernameConstr
);
