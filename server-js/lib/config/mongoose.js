"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dbConfig = _interopRequireDefault(require("./db.config.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");

  _mongoose.default.connect("mongodb://".concat(_dbConfig.default.DB_USER, ":").concat(_dbConfig.default.DB_PASS, "@").concat(_dbConfig.default.HOST, ":").concat(_dbConfig.default.DB_PORT, "/").concat(_dbConfig.default.DB_NAME), options).then(() => {
    console.log("MongoDB is connected");
  }).catch(err => {
    console.log("MongoDB connection unsuccessful, retry after 5 seconds. ");
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();
var _default = _mongoose.default;
exports.default = _default;