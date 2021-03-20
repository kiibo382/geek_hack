#!/usr/bin/env node

import app from "../app.js";
import d from "debug";
const debug = d("casumee-server:app");
import { createServer } from "http";
// import socketio from "socket.io";

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const httpServer = createServer(app);
// const io = socketio(httpServer, {
//   pingInterval: 1000,
//   pingTimeout: 5000
// });

// io.on("connection", (socket: socketio.Socket) => {
//   console.log("user connected");

//   socket.on("group-post", (msg: string) => {
//     socket.emit("group-member-post", msg);
//   });
// });

httpServer.listen(port);
httpServer.on("error", onError);

function normalizePort(val: string) {
  const port: number = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
