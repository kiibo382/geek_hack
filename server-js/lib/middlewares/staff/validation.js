"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staffVerifyRefreshBodyField = staffVerifyRefreshBodyField;
exports.staffValidRefreshNeeded = staffValidRefreshNeeded;
exports.staffValidJWTNeeded = staffValidJWTNeeded;

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.split.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _envConfig = _interopRequireDefault(require("../../config/env.config.js"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staffSecret = _envConfig.default.jwt_staff_secret;

function staffVerifyRefreshBodyField(req, res, next) {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({
      error: "need to pass refresh_token field"
    });
  }
}

function staffValidRefreshNeeded(req, res, next) {
  const b = Buffer.from(req.body.refresh_token, "base64");
  const refresh_token = b.toString();

  const hash = _crypto.default.createHmac("sha512", req.jwt.refreshKey).update("".concat(req.jwt.userId).concat(staffSecret)).digest("base64");

  if (hash === refresh_token) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({
      error: "Invalid refresh token"
    });
  }
}

function staffValidJWTNeeded(req, res, next) {
  if (req.session.token) {
    var bearerToken = req.session.token;
  } else if (req.headers["authorization"]) {
    var bearerToken = req.headers["authorization"];
  } else {
    return res.status(401).send();
  }

  try {
    const authorization = bearerToken.split(" ");

    if (authorization[0] !== "Bearer") {
      return res.status(401).send();
    } else {
      req.jwt = _jsonwebtoken.default.verify(authorization[1], staffSecret);
      return next();
    }
  } catch (err) {
    return res.status(403).send();
  }
}