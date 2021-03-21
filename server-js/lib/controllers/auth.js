"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnToken = returnToken;
exports.refreshToken = refreshToken;
exports.returnStaffToken = returnStaffToken;
exports.staffRefreshToken = staffRefreshToken;

require("core-js/modules/es.regexp.to-string.js");

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staffSecret = _envConfig.default.jwt_staff_secret;

function returnToken(req, res) {
  try {
    const refreshId = req.body.email + secret;

    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(refreshId).digest("base64");

    req.body.refreshKey = salt;

    const token = _jsonwebtoken.default.sign(req.body, secret);

    const b = Buffer.from(hash);
    const refresh_token = b.toString("base64");
    res.status(201).send({
      accessToken: token,
      refreshToken: refresh_token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
}

function refreshToken(req, res) {
  try {
    req.body = req.jwt;

    const token = _jsonwebtoken.default.sign(req.body, secret);

    res.status(201).send({
      id: token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
}

function returnStaffToken(req, res) {
  try {
    const refreshId = req.body.userId + staffSecret;

    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(refreshId).digest("base64");

    req.body.refreshKey = salt;

    const token = _jsonwebtoken.default.sign(req.body, staffSecret);

    const b = Buffer.from(hash);
    const refresh_token = b.toString("base64");
    res.status(201).send({
      accessToken: token,
      refreshToken: refresh_token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
}

function staffRefreshToken(req, res) {
  try {
    req.body = req.jwt;

    const token = _jsonwebtoken.default.sign(req.body, staffSecret);

    res.status(201).send({
      id: token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
}