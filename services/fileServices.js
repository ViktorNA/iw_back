const fs = require("fs");
const { PATH_TO_CHATS } = require("../consts");

const getAllJsonsPaths = (pathToDir = PATH_TO_CHATS) => {
  const jsonPath = [];
  const scanRec = (path) => {
    const fileObjs = fs.readdirSync(path, { withFileTypes: true });
    fileObjs.forEach((file) => {
      if (file.isDirectory()) {
        scanRec(path + "/" + file.name);
      } else {
        jsonPath.push(path + "/" + file.name);
      }
    });
  };
  scanRec(pathToDir);
  return jsonPath
    .filter((x) => x.endsWith(".json"))
    .sort((a, b) => a.length - b.length);
};

const getFoldersToUpdate = () => {
  const fileObjs = fs.readdirSync(PATH_TO_CHATS, { withFileTypes: true });
  return fileObjs.map((f) => f.name);
};

module.exports = {
  getAllJsonsPaths,
  getFoldersToUpdate,
};
