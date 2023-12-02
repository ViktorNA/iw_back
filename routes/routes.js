const express = require("express");
const {
  addGroupMeta,
  increaseMessageCount,
} = require("../services/groupMetaServices");

const router = express.Router();

router.post("/post", async (req, res) => {
  const { name, type, id } = req.body;
  const [code, data] = await addGroupMeta(name, type, id);
  res.status(code).json(data);
});

router.post("/inc", async (req, res) => {
  const { id } = req.body;
  const [code, data] = await increaseMessageCount(id);
  res.status(code).json(data);
});

module.exports = router;
