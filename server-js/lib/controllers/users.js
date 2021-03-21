"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertUser = insertUser;
exports.getUserList = getUserList;
exports.login = login;
exports.logout = logout;
exports.getSelf = getSelf;
exports.getByUserName = getByUserName;
exports.putByUserName = putByUserName;
exports.removeByUserName = removeByUserName;

require("core-js/modules/es.regexp.to-string.js");

var _users = _interopRequireDefault(require("../models/users.js"));

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = _envConfig.default.jwt_secret;

function insertUser(req, res) {
  const salt = _crypto.default.randomBytes(16).toString("base64");

  const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  const user = new _users.default(req.body);
  user.save(function (err) {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
}

function getUserList(req, res) {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  _users.default.find().limit(limit).skip(page).select("userName firstName lastName email profile age gender sns").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function login(req, res) {
  try {
    const refreshId = req.body.email + secret;

    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(refreshId).digest("base64");

    req.body.refreshKey = salt;

    const token = _jsonwebtoken.default.sign(req.body, secret);

    const b = Buffer.from(hash);
    const refresh_token = b.toString("base64");
    req.session.token = "Bearer ".concat(token);
    res.status(200).send();
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
}

function logout(req, res) {
  if (req.session.token) {
    req.session.token = "";
    res.status(200).send();
  } else {
    return res.status(401).send();
  }
}

function getSelf(req, res) {
  _users.default.findOne({
    "userName": req.jwt.userName
  }).select("userName firstName lastName email profile age gender sns").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function getByUserName(req, res) {
  _users.default.findOne({
    "userName": req.params.userName
  }).select("userName firstName lastName email profile age gender sns").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function putByUserName(req, res) {
  if (req.body.password) {
    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

    req.body.password = salt + "$" + hash;
  }

  _users.default.findOneAndUpdate({
    "userName": req.jwt.userName
  }, req.body).exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function removeByUserName(req, res) {
  _users.default.deleteOne({
    "userName": userName
  }).exec(function (err, result) {
    if (err) res.status(500).send(err);
    req.session.token = "";
    res.status(204).send(result);
  });
}