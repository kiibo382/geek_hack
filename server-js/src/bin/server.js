import app from "../app.js";
// import httpModule from "http";
// import { Server } from "socket.io";

const port = 3000;
app.set("port", port);

// const server = httpModule.createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("user connected");

//   socket.on("group-post", (msg) => {
//     socket.emit("group-member-post", msg);
//   });
// });

app.listen(port);
console.log(`Server listen on port ${port}`);