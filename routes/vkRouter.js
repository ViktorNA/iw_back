const express = require("express");
const { addManyMessagesToGroup } = require("../services/messagesService");
const {
  addIdGroupConstraints,
  addIdUsernameConstraints,
} = require("../services/constrService");
const {
  getAllVkGroupIds,
  addVkGroupId,
  insertVkComments,
  insertVkPost,
  getRandomPublicGroup,
  getVkTokens,
  addVkToken,
  addFinishTag,
  setGroupOffset,
  getVkPostsByUserId,
  addVkGroupIdMany,
  updateGroupName,
  getVkGroupsMany,
  getVkMessagesByWord,
} = require("../services/vkGroupService");
const { addVkProfiles } = require("../services/vkProfilesService");
const router = express.Router();

router.post("/messages", async (req, res) => {
  const { groupId, messages } = req.body;
  const [code, answer] = await addManyMessagesToGroup(groupId, messages);
  console.log(answer);
  res.status(code).json(answer);
});

router.post("/constraints", async (req, res) => {
  const { groupId, users } = req.body;
  const userIdUsernameConstr = users.map((user) => ({
    chatUserId: user.id,
    chatUserName: user.username,
  }));
  await addIdUsernameConstraints(userIdUsernameConstr);
  const userIdGroupIdConstr = users.map((user) => ({
    chatUserId: user.id,
    groupId: groupId,
  }));
  const [code, answer] = await addIdGroupConstraints(userIdGroupIdConstr);
  res.status(code).json(answer);
});

router.get("/vkGroupId", async (req, res) => {
  const [code, answer] = await getAllVkGroupIds();
  res.status(code).json(answer);
});

router.post("/vkGroupId", async (req, res) => {
  const { vkGroupId } = req.body;
  const [code, answer] = await addVkGroupId(vkGroupId);
  res.status(code).json(answer);
});

router.put("/vkGroupId", async (req, res) => {
  const { vkGroupId, name } = req.body;
  const [code, answer] = await updateGroupName(vkGroupId, name);
  res.status(code).json(answer);
});

router.post("/vkGroupIds", async (req, res) => {
  const { vkGroupIds } = req.body;
  const [code, answer] = await addVkGroupIdMany(vkGroupIds);
  res.status(code).json(answer);
});

router.post("/comments", async (req, res) => {
  const {
    groupId,
    post: { id, comments, text, date, from_id },
  } = req.body;
  await insertVkPost({ id, groupId, date, text, from_id });
  const commentsToSave = [];
  comments.forEach((comment) => {
    const { from_id, comment_id, date, text } = comment;
    commentsToSave.push({
      id: comment_id,
      from_id,
      text,
      date,
      postId: id,
      groupId,
    });
  });
  const [code, answer] = await insertVkComments(groupId, id, commentsToSave);
  res.status(code).json(answer);
});

router.get("/randomGroupId", async (req, res) => {
  const [code, answer] = await getRandomPublicGroup();
  res.status(code).json(answer);
});

router.get("/vkToken", async (req, res) => {
  const [code, answer] = await getVkTokens();
  res.status(code).json(answer);
});

router.post("/vkToken", async (req, res) => {
  const token = req.body;
  const [code, answer] = await addVkToken(token);
  res.status(code).json(answer);
});

router.post("/finishTag", async (req, res) => {
  const { groupId } = req.body;
  const [code, answer] = await addFinishTag(groupId);
  res.status(code).json(answer);
});

router.post("/offset", async (req, res) => {
  const { groupId, offset } = req.body;
  const [code, answer] = await setGroupOffset(groupId, offset);
  res.status(code).json(answer);
});

router.get("/vkPosts", async (req, res) => {
  const { userId } = req.query;
  const [code, answer] = await getVkPostsByUserId(userId);
  res.status(code).json(answer);
});

router.post("/vkProfiles", async (req, res) => {
  const { profiles, edu } = req.body;
  const eduAsOneArray = [];
  edu.forEach((e) => {
    e.uni.forEach((u) =>
      eduAsOneArray.push({ ...u, user_id: e.user_id, type: 1 })
    );
    e.schools.forEach((s) =>
      eduAsOneArray.push({ ...s, user_id: e.user_id, type: 2 })
    );
  });
  const [code, answer] = await addVkProfiles(
    profiles.map((p) => ({ ...p, record_date: new Date(), dump_version: 1 })),
    eduAsOneArray
  );
  res.status(code).json(answer);
});

router.post("/vkGroupsMany", async (req, res) => {
  const { groupIds } = req.body;
  const [code, answer] = await getVkGroupsMany(groupIds);
  res.status(code).json(answer);
});

router.get("/vkCommentsByWord", async (req, res) => {
  const { word, groupId, date } = req.query;
  const [code, answer] = await getVkMessagesByWord(word, groupId, date);
  res.status(code).json(answer);
});

module.exports = router;
