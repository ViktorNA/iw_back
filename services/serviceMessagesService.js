const ServiceMessagesModel = require("../model/serviceMessageModel");

const addServiceMessageMany = async (messages) => {
  try {
    const savedMessages = await ServiceMessagesModel.insertMany(messages, {
      ordered: false,
    });
    return [200, savedMessages];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findServiceMessagesByUserId = async (userId) => {
  try {
    const messages = await ServiceMessagesModel.find({
      actor_id: userId,
      isSelfAction: true,
    });
    return [200, messages];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

module.exports = {
  addServiceMessageMany,
  findServiceMessagesByUserId,
};
