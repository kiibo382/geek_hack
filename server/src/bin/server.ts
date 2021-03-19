#!/usr/bin/env node

import app from "../app.js";
import d from "debug";
const debug = d("casumee-server:app");
import httpModule from "http";
import { Server } from "socket.io";

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = httpModule.createServer(app);
const socket = new Server(server);

socket.on("connection", (socket) => {
  console.log("user connected");

  socket.on("group-post", (msg: string) => {
    socket.emit("group-member-post", msg);
  });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

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

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
