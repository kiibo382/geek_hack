import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from 'cors'
import log4js from 'log4js';

let logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("My Debug message");


import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import staffRouter from "./routes/staff.js";
import groupsRouter from "./routes/groups.js"

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const app = express();

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'debug' }));
app.use(cors())
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(serverDir + "public")));

app.use("/api/users", usersRouter);
app.use("/api/staff", staffRouter);
app.use("/api/auth", authRouter);
app.use("/api/groups", groupsRouter);

export default app;
