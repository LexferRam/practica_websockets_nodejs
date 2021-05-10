const express = require("express");
const socketIO = require("socket.io");
const app = express();

app.set("port", process.env.PORT || 4000);

const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log(socket.id);
});
