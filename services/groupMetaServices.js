const GroupMeta = require("../model/groupMeta");
const ChatUserIdGroupConstr = require("../model/chatUserIdGroupIsConsrModel");

const addGroupMeta = async (name, type, id, username = "") => {
  try {
    const data = new GroupMeta({
      name,
      type,
      id,
      username,
    });
    const groupMeta = await data.save();
    return [200, groupMeta];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const increaseMessageCount = async (groupId, count = 1) => {
  try {
    const groupMeta = await GroupMeta.findOneAndUpdate(
      { id: groupId },
      { $inc: { messageCount: count } }
    );
    return [200, groupMeta];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const setMessagesCount = async (groupId, messageCount) => {
  try {
    const groupMeta = await GroupMeta.findOneAndUpdate(
      { id: groupId },
      { messageCount }
    );
    return [200, groupMeta];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getAllGroupsMeta = async () => {
  try {
    const groupMetas = await GroupMeta.find();
    return [200, groupMetas];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getGroupMetaById = async (groupId) => {
  try {
    const groupMeta = await GroupMeta.findOne({ id: groupId });
    return [200, groupMeta];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findGroupMetaByIdArray = async (groupIds) => {
  try {
    const groupMetas = await GroupMeta.find({ id: { $in: groupIds } });
    return [200, groupMetas];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findChatUsersByGroupId = async (groupId) => {
  try {
    const users = await ChatUserIdGroupConstr.find({ groupId: groupId });
    if (users) return [200, users];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const updateGroupUsernameById = async (groupId, username) => {
  try {
    const groupMeta = await GroupMeta.updateOne({ id: groupId }, { username });
    if (groupMeta) return [200, groupMeta];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

module.exports = {
  addGroupMeta,
  increaseMessageCount,
  setMessagesCount,
  getAllGroupsMeta,
  getGroupMetaById,
  findGroupMetaByIdArray,
  findChatUsersByGroupId,
  updateGroupUsernameById,
};
