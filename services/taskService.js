const TaskModel = require("../model/taskModel");
const addTask = async (status, message) => {
  const data = new TaskModel({
    status,
    message,
  });

  try {
    const task = await data.save();
    return [200, task];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const updateTaskById = async (id, status, message) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      { _id: id },
      {
        status,
        message,
      }
    );
    return [200, task];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const addManyTasks = async (tasks) => {
  try {
    const dataToSave = await TaskModel.insertMany(tasks);
    return [200, dataToSave];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const updateManyTasks = async (tasks) => {
  try {
    const dataToSave = await TaskModel.updateMany({}, tasks, { multi: true });
    return [200, dataToSave];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const findActiveAndPendingTasks = async () => {
  try {
    const dataToSave = await TaskModel.find({
      status: { $in: ["processing", "pending"] },
    });
    return [200, dataToSave];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

const deleteAllPending = async () => {
  try {
    const dataToSave = await TaskModel.deleteMany({
      status: "pending",
    });
    return [200, dataToSave];
  } catch (error) {
    return [400, { message: error.message }];
  }
};

module.exports = {
  addTask,
  updateTaskById,
  addManyTasks,
  updateManyTasks,
  findActiveAndPendingTasks,
  deleteAllPending,
};
