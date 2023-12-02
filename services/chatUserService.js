const ChatUser = require("../model/chatUserModel");

const addChatUser = async (id, names, chatIds) => {
  const data = new ChatUser({
    names,
    id,
    chatIds,
  });

  try {
    const user = await data.save();
    return [200, user];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const updateChatUser = async (id, names, chatIds) => {
  try {
    const user = await ChatUser.findOneAndUpdate(
      { id: id },
      { names, chatIds }
    );
    return [200, user];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findChatUserById = async (id) => {
  try {
    const user = await ChatUser.findOne({ id: id });
    if (user) return [200, user];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findAllChatUsers = async () => {
  try {
    const users = await ChatUser.find({});
    if (users) return [200, users];
    return [200, []];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

module.exports = {
  addChatUser,
  updateChatUser,
  findChatUserById,
  findAllChatUsers,
};
