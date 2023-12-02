const VkProfileModel = require("../model/vkProfileModel");
const VkEduModel = require("../model/vkEduModel");
const addVkProfiles = async (profiles, edu) => {
  try {
    await VkEduModel.insertMany(edu, { ordered: true });
    await VkProfileModel.insertMany(profiles, {
      ordered: false,
    });
  } catch (error) {
    return [400, { message: error.message }];
  }

  return [200, { message: "ok" }];
};

module.exports = {
  addVkProfiles,
};
