import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import groupsRouter from "./routes/groups.js"

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const app = express();
// const http = require("http").createServer(app);
// const io   = require("socket.io")(http);

app.use(cookieParser());
let sess = {
  secret: "secret_key",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30,
    sameSite: "lax",
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));

const serverDir = import.meta.url.replace("app.js", "");
app.set("views", path.join(serverDir + "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(serverDir + "public")));

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("group", groupsRouter);

// io.on("connection", (socket)=>{
//   console.log("ユーザーが接続しました");

//   socket.on("post", (msg)=>{
//     io.emit("member-post", msg);
//   });
// });

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
