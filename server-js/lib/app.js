"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _redis = _interopRequireDefault(require("redis"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectRedis = _interopRequireDefault(require("connect-redis"));

var _cors = _interopRequireDefault(require("cors"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _staff = _interopRequireDefault(require("./routes/staff.js"));

var _groups = _interopRequireDefault(require("./routes/groups.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RedisStore = (0, _connectRedis.default)(_expressSession.default);

const redisClient = _redis.default.createClient();

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _cookieParser.default)());
let sess = {
  secret: "secret_key",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30,
    sameSite: "lax"
  }
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use((0, _expressSession.default)(sess)); // const serverDir = import.meta.url.replace("app.js", "");

app.set("views", _path.default.join(__dirname + "views"));
app.set("view engine", "ejs");
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.static(_path.default.join(__dirname + "public")));
app.use("/api/users", _users.default);
app.use("/api/staff", _staff.default);
app.use("/api/auth", _auth.default);
app.use("/api/groups", _groups.default);
var _default = app;
exports.default = _default;