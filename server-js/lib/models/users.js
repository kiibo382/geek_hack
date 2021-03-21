"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByEmail = findByEmail;
exports.findByUserName = findByUserName;
exports.createUser = createUser;
exports.userList = userList;
exports.putUser = putUser;
exports.removeUser = removeUser;
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _validator2 = _interopRequireDefault(require("validator"));

var _mongoose = _interopRequireDefault(require("../config/mongoose.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const snsSchema = new Schema({
  snsName: {
    type: String,
    required: true
  },
  snsUrl: {
    type: String,
    required: true
  },
  followers: Number
});
const usersSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: v => _validator2.default.isEmail(v),
      message: props => "".concat(props.value, " is invalid email address")
    }
  },
  password: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    default: 1
  },
  profile: String,
  age: Number,
  gender: String,
  sns: [snsSchema]
});

const Users = _mongoose.default.model("Users", usersSchema);

function findByEmail(email) {
  return Users.find({
    "email": email
  });
}

function findByUserName(userName) {
  return Users.findOne({
    "userName": userName
  }).select("userName firstName lastName email profile age gender sns");
}

function createUser(userData) {
  const user = new Users(userData);
  return user.save();
}

function userList(perPage, page) {
  return Users.find().limit(perPage).skip(perPage * page).select("userName firstName lastName email profile age gender sns");
}

function putUser(userName, userData) {
  return Users.findOneAndUpdate({
    "userName": userName
  }, userData);
}

async function removeUser(userName) {
  try {
    return Users.deleteMany({
      "userName": userName
    });
  } catch (e) {
    return e;
  }
}

var _default = Users;
exports.default = _default;