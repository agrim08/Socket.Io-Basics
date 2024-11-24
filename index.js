const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) =>
  socket.on("user-message", (message) => {
    io.emit("message", message);
  })
);

app.use(express.static(path.join("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(7000, () => console.log("connected successfully"));
