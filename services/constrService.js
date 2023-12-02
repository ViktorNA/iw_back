const ChatUserIdGroup = require("../model/chatUserIdGroupIsConsrModel");
const ChatUserIdUsername = require("../model/chatUserIdUsernameConstrModel");
const { findGroupMetaByIdArray } = require("./groupMetaServices");

const addIdGroupConstraints = async (constraints) => {
  try {
    const constr = await ChatUserIdGroup.insertMany(constraints, {
      ordered: false,
    });
    return [200, constr];
  } catch (error) {
    if (error.code === 11000) {
      return [200, { numberInserted: error.result.nInserted }];
    }
    return [400, { message: error.message }];
  }
};

const addIdUsernameConstraints = async (constraints) => {
  try {
    const constr = await ChatUserIdUsername.insertMany(constraints, {
      ordered: false,
    });
    return [200, constr];
  } catch (error) {
    if (error.code === 11000) {
      return [200, { numberInserted: error.result.nInserted }];
    }
    return [400, { message: error.message }];
  }
};

const findChatUsersByIdOrName = async (idOrName) => {
  try {
    const dataToSave = await ChatUserIdUsername.find({ chatUserId: idOrName });

    return [200, dataToSave.filter((x) => x.constr.startsWith("user"))];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findGroupsByUserId = async (userId) => {
  try {
    const groups = await ChatUserIdGroup.find({ chatUserId: userId });
    const groupIds = groups.map((x) => x.groupId);
    const dataToSave = await findGroupMetaByIdArray(groupIds);
    return [200, dataToSave[1]];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

module.exports = {
  addIdGroupConstraints,
  addIdUsernameConstraints,
  findChatUsersByIdOrName,
  findGroupsByUserId,
};
