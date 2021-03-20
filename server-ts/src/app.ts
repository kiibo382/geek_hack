import Express from 'express'
import path from 'path'
import router from './routes/index'
import layouts from 'express-ejs-layouts'
import mongoose from "mongoose"
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from 'cors'
import {dbConfig} from "./config/db.config"

declare module 'express-session' {
  interface SessionData {
    token: any;
  }
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  `mongodb://${dbConfig.DB_USER}:${dbConfig.DB_PASS}@${dbConfig.HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`,
  options
)
mongoose.Promise = global.Promise

const app = Express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(layouts)
app.use(Express.static(__dirname + '/public'))
app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use('/', router)

app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  app.use(session(
    {
      secret: "secret_key",
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
      }),
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 30,
        sameSite: "lax",
      },
    }
  ));
} else {
  app.use(session(
    {
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
    }
  ));
}


app.use(function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  next(createError(404));
});

app.use(function (err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
