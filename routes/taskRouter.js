const express = require("express");
const {
  updateTaskById,
  addManyTasks,
  updateManyTasks,
  findActiveAndPendingTasks,
  deleteAllPending,
} = require("../services/taskService");

const router = express.Router();

router.put("/", async (req, res) => {
  const { id, status, message } = req.body;
  const [code, user] = await updateTaskById(id, status, message);
  res.status(code).json(user);
});

// add many tasks

router.post("/many", async (req, res) => {
  const [code, tasks] = await addManyTasks(req.body);
  res.status(code).json(tasks);
});

router.put("/many", async (req, res) => {
  console.log(req.body);
  const [code, tasks] = await updateManyTasks(req.body);
  res.status(code).json(tasks);
});

router.get("/activeAndPending", async (req, res) => {
  const [code, tasks] = await findActiveAndPendingTasks();
  res.status(code).json(tasks);
});

router.delete("/pending", async (req, res) => {
  const [code, tasks] = await deleteAllPending();
  res.status(code).json(tasks);
});

module.exports = router;
