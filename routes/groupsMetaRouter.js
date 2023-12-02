const express = require("express");
const {
  getAllGroupsMeta,
  getGroupMetaById,
  findChatUsersByGroupId,
  addGroupMeta,
  updateGroupUsernameById,
} = require("../services/groupMetaServices");
const router = express.Router();

router.get("/", async (req, res) => {
  const [code, answer] = await getAllGroupsMeta();
  res.status(code).json(answer);
});

router.post("/", async (req, res) => {
  const { id, name, username } = req.body;

  const [code, answer] = await addGroupMeta(name, "public_group", id, username);
  res.status(code).json(answer);
});

router.get("/byId", async (req, res) => {
  const { id } = req.query;
  const [code, answer] = await getGroupMetaById(id);
  res.status(code).json(answer);
});

router.get("/users", async (req, res) => {
  const { id } = req.query;

  const [code, answer] = await findChatUsersByGroupId(id);
  res.status(code).json(answer);
});

router.put("/username", async (req, res) => {
  const { id, username } = req.body;

  const [code, answer] = await updateGroupUsernameById(id, username);
  res.status(code).json(answer);
});

module.exports = router;
