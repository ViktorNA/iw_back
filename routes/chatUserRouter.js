const express = require("express");
const {
  findChatUserById,
  findAllChatUsers,
} = require("../services/chatUserService");
const {
  findChatUsersByIdOrName,
  findGroupsByUserId,
} = require("../services/constrService");

const router = express.Router();

router.get("/", async (req, res) => {
  const chatUserId = req.query.id;
  const [code, user] = await findChatUserById(chatUserId);
  res.status(code).json(user);
});

router.get("/all", async (req, res) => {
  const [code, users] = await findAllChatUsers();

  res.status(code).json(users);
});

router.get("/byIdOrName", async (req, res) => {
  const [code, users] = await findChatUsersByIdOrName(req.query.id);
  res.status(code).json(users);
});

router.get("/groups", async (req, res) => {
  const [code, groups] = await findGroupsByUserId(req.query.id);
  res.status(code).json(groups);
});

module.exports = router;
