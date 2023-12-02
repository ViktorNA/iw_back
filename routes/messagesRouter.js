const express = require("express");
const { findChatUserById } = require("../services/chatUserService");
const {
  addManyMessagesToGroup,
  getLastMessageOfGroup,
  getMessagesByUserId,
} = require("../services/messagesService");

const router = express.Router();

router.post("/many", async (req, res) => {
  const { messages, groupId } = req.body;

  const [code, answer] = await addManyMessagesToGroup(groupId, messages);
  res.status(code).json(answer);
});

router.get("/last", async (req, res) => {
  const { groupId } = req.query;

  const [code, answer] = await getLastMessageOfGroup(groupId);
  res.status(code).json(answer);
});

router.get("/ofUserInGroup", async (req, res) => {
  const { userId, groupId } = req.query;

  const [code, answer] = await getMessagesByUserId(userId, groupId);
  res.status(code).json(answer);
});

module.exports = router;
