const { increaseMessageCount } = require("./groupMetaServices");
const { tgMessageModel } = require("../model/tgMessageModel");
const {
  addIdGroupConstraints,
  addIdUsernameConstraints,
} = require("./constrService");

const addManyMessagesToGroup = async (groupId, messages) => {
  const chatUserIds = new Set();
  messages.forEach((m) => {
    chatUserIds.add(m.from_id);
  });
  const chatUserIdsArray = Array.from(chatUserIds);
  const userIdGroupConstr = chatUserIdsArray.map((id) => ({
    chatUserId: id,
    groupId,
  }));

  const userNameIdConstr = chatUserIdsArray.map((id) => {
    const chatUserName = messages.find((m) => m.from_id === id).from;
    return {
      chatUserName,
      chatUserId: id,
    };
  });

  try {
    const savedMessages = await tgMessageModel.insertMany(
      messages.map((m) => ({ groupId, ...m })),
      { ordered: false }
    );

    await addIdGroupConstraints(userIdGroupConstr);
    await addIdUsernameConstraints(userNameIdConstr);
    await increaseMessageCount(groupId, savedMessages.length);
    return [200, savedMessages];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getLastMessageOfGroup = async (groupId) => {
  try {
    const lastMessage = await tgMessageModel
      .find({ groupId })
      .sort({ date: -1 })
      .limit(1);
    return [200, lastMessage[0] || null];
  } catch (error) {
    console.log(error);
    return [400, { message: error.message }];
  }
};

const getMessagesByUserId = async (userId, groupId) => {
  try {
    const messages = await tgMessageModel
      .find({ from_id: userId, groupId })
      .sort({
        id: 1,
      });
    const replyIds = messages
      .filter((m) => m.reply_to_message_id !== null)
      .map((m) => m.reply_to_message_id);
    const replies = await tgMessageModel.find({
      id: { $in: replyIds },
      groupId,
    });
    return [200, { messages, replies }];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

module.exports = {
  addManyMessagesToGroup,
  getLastMessageOfGroup,
  getMessagesByUserId,
};
