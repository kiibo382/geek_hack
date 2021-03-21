"use strict";

var _app = _interopRequireDefault(require("../app.js"));

var _http = _interopRequireDefault(require("http"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 8080;

const httpServer = _http.default.createServer(_app.default);

const io = new _socket.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
io.on("connection", socket => {
  console.log("".concat(socket.id, " connected")); // Join a conversation

  const {
    roomId
  } = socket.handshake.query;
  socket.join(roomId); // Listen for new messages

  socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  }); // Leave the room if the user closes the socket

  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});
httpServer.listen(port, () => {
  console.log("listening on *:".concat(port));
});