const VkGroupIdModel = require("../model/vkGroupIdModel");
const VkPostModel = require("../model/vkPostModel");
const VkCommentsModel = require("../model/vkCommentModel");
const VkTokenModel = require("../model/vkTokenModel");

const getAllVkGroupIds = async () => {
  try {
    const groupIds = await VkGroupIdModel.find({});
    if (groupIds) return [200, groupIds];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const addVkGroupId = async (groupId, name = "") => {
  try {
    const dataToSave = new VkGroupIdModel({ id: groupId, name });
    const groupIds = await dataToSave.save();
    return [200, groupIds];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const updateGroupName = async (groupId, name) => {
  try {
    const group = await VkGroupIdModel.updateOne({ id: groupId }, { name });
    return [200, group];
  } catch (e) {
    console.log(e);
    return [400, { message: e.message }];
  }
};

const addVkGroupIdMany = async (groupIds) => {
  try {
    const groups = await VkGroupIdModel.insertMany(groupIds);
    return [200, groups];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const insertVkComments = async (groupId, postId, comments) => {
  const commentsWithIds = comments.map((comment) => {
    const { id, date, text, from_id } = comment;
    return {
      groupId,
      postId,
      id,
      text,
      date,
      from_id,
    };
  });
  try {
    const savedComments = await VkCommentsModel.insertMany(commentsWithIds, {
      ordered: false,
    });
    return [200, savedComments];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const insertVkPost = async (post) => {
  try {
    const dataToSave = new VkPostModel(post);
    const savedPosts = await dataToSave.save();
    return [200, savedPosts];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getRandomPublicGroup = async () => {
  try {
    const group = await VkGroupIdModel.findOne({
      isProcessing: false,
      isPrivate: false,
      isLoaded: false,
    });
    if (group) {
      await VkGroupIdModel.updateOne({ id: group.id }, { isProcessing: true });
      return [200, group];
    }
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getVkTokens = async () => {
  try {
    const token = await VkTokenModel.find({ isValid: true });
    if (token) return [200, token];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const addVkToken = async (token) => {
  try {
    const dataToSave = new VkTokenModel(token);
    const savedToken = await dataToSave.save();
    return [200, savedToken];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const addFinishTag = async (groupId) => {
  try {
    const group = await VkGroupIdModel.updateOne(
      { id: groupId },
      { isProcessing: false, isLoaded: true }
    );
    if (group) return [200, group];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const setGroupOffset = async (groupId, offset) => {
  try {
    const group = await VkGroupIdModel.updateOne(
      { id: groupId },
      { offset, isProcessing: false }
    );
    if (group) return [200, group];
    return [404, null];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getVkPostsByUserId = async (userId) => {
  try {
    const comments = await VkCommentsModel.find({ from_id: userId });

    if (!comments) return [404, null];

    const postIds = [];
    for (let i = 0; i < comments.length; i++) {
      const postId = comments[i].postId;
      if (postIds.indexOf(postId) === -1) postIds.push(postId);
    }

    const posts = await VkPostModel.find({
      $or: [{ from_id: userId }, { id: { $in: postIds } }],
    });
    return [200, { comments, posts }];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getVkGroupsMany = async (groupIds = []) => {
  try {
    const groups = await VkGroupIdModel.find({ id: { $in: groupIds } });
    return [200, { groups }];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const getVkMessagesByWord = async (word, groupId, date = "0") => {
  console.log(groupId);
  try {
    const startDate = new Date(Number.parseInt(date));
    const regExp = new RegExp(`${word}`, "i");
    const messages = await VkCommentsModel.find({
      groupId: groupId,
      date: {
        $gte: startDate,
      },
      text: regExp,
    }).sort({ date: 1 });
    return [200, messages];
  } catch (e) {
    return [400, { message: e.message }];
  }
};

module.exports = {
  getAllVkGroupIds,
  addVkGroupId,
  addVkGroupIdMany,
  updateGroupName,
  insertVkComments,
  insertVkPost,
  getRandomPublicGroup,
  getVkTokens,
  addVkToken,
  addFinishTag,
  setGroupOffset,
  getVkPostsByUserId,
  getVkGroupsMany,
  getVkMessagesByWord,
};
