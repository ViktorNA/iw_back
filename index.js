require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGO_STRING } = require("./consts");

const groupMetaRoutes = require("./routes/routes");
const chatUserRouter = require("./routes/chatUserRouter");
const taskRouter = require("./routes/taskRouter");
const messagesRouter = require("./routes/messagesRouter");
const groupsMetaRouter = require("./routes/groupsMetaRouter");
const serviceMessagesRouter = require("./routes/serviceMessagesRouter");
const vkRouter = require("./routes/vkRouter");

mongoose.connect(MONGO_STRING);
console.log(MONGO_STRING);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/groupMeta", groupMetaRoutes);
app.use("/api/chatUser", chatUserRouter);
app.use("/api/task", taskRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/groups", groupsMetaRouter);
app.use("/api/serviceMessages", serviceMessagesRouter);
app.use("/api/vk", vkRouter);

app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
});
