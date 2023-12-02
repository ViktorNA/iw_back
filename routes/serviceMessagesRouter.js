const express = require("express");
const {
  findServiceMessagesByUser,
} = require("../services/serviceMessagesService");
const { findGroupMetaByIdArray } = require("../services/groupMetaServices");
const router = express.Router();

router.get("/byUserId", async (req, res) => {
  const chatUserId = req.query.id;

  const [code, messages] = await findServiceMessagesByUser(chatUserId);
  if (messages.length === 0) {
    res.status(code).json({ messages });
    return;
  }
  const groupIds = [];
  for (let i = 0; i < messages.length; i++) {
    groupIds.push(messages[i].groupId);
  }
  const [code1, groupMetas] = await findGroupMetaByIdArray(groupIds);
  res.status(code1).json({ messages, groupMetas });
});

module.exports = router;
