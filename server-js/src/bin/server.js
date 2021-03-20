import app from "../app.js";
import http from "http";
import { Server } from "socket.io";

const port = 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer);

httpServer.listen(port, () => {
    console.log(`listening on *:${PORT}`)
})

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("group-post", (msg) => {
        socket.emit("group-member-post", msg);
    });
});

