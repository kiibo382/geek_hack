"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertStaff = insertStaff;
exports.getStaffList = getStaffList;
exports.staffLogin = staffLogin;
exports.staffLogout = staffLogout;
exports.getStaffSelf = getStaffSelf;
exports.getByStaffName = getByStaffName;
exports.putByStaffName = putByStaffName;
exports.removeByStaffName = removeByStaffName;

require("core-js/modules/es.regexp.to-string.js");

var _staff = _interopRequireDefault(require("../models/staff.js"));

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staffSecret = _envConfig.default.jwt_staff_secret;

function insertStaff(req, res) {
  const salt = _crypto.default.randomBytes(16).toString("base64");

  const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  const staff = new _staff.default(req.body);
  staff.save(function (err) {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
}

function getStaffList(req, res) {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  _staff.default.find().limit(limit).skip(page).select("staffName firstName lastName email").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function staffLogin(req, res) {
  try {
    const refreshId = req.body.email + staffSecret;

    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(refreshId).digest("base64");

    req.body.refreshKey = salt;

    const token = _jsonwebtoken.default.sign(req.body, staffSecret);

    const b = Buffer.from(hash);
    const refresh_token = b.toString("base64");
    req.session.token = "Bearer ".concat(token);
    res.status(200).send({
      refreshToken: refresh_token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
}

function staffLogout(req, res) {
  if (req.session.token) {
    req.session.token = "";
    res.status(200).send();
  } else {
    return res.status(401).send();
  }
}

function getStaffSelf(req, res) {
  _staff.default.findOne({
    "staffName": req.jwt.staffName
  }).select("userName firstName lastName email").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function getByStaffName(req, res) {
  _staff.default.findOne({
    "staffName": req.params.staffName
  }).select("userName firstName lastName email").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function putByStaffName(req, res) {
  if (req.body.password) {
    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

    req.body.password = salt + "$" + hash;
  }

  _staff.default.findOneAndUpdate({
    "staffName": req.jwt.staffName
  }, req.body).exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function removeByStaffName(req, res) {
  _staff.default.deleteOne({
    "staffName": staffName
  }).exec(function (err, result) {
    if (err) res.status(500).send(err);
    req.session.token = "";
    res.status(204).send(result);
  });
}