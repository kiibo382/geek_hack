"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasAuthValidFields = hasAuthValidFields;
exports.isPasswordAndUserMatch = isPasswordAndUserMatch;
exports.isPasswordAndStaffMatch = isPasswordAndStaffMatch;

require("core-js/modules/es.string.split.js");

var _users = _interopRequireDefault(require("../../models/users.js"));

var _staff = _interopRequireDefault(require("../../models/staff.js"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasAuthValidFields(req, res, next) {
  const errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing email field");
    }

    if (!req.body.password) {
      errors.push("Missing password field");
    }

    if (errors.length) {
      return res.status(400).send({
        errors: errors.join(",")
      });
    } else {
      return next();
    }
  } else {
    return res.status(400).send({
      errors: "Missing email and password fields"
    });
  }
}

function isPasswordAndUserMatch(req, res, next) {
  _users.default.findOne({
    "email": req.body.email
  }).exec(function (err, user) {
    if (err) res.status(500).send(err);

    if (!user) {
      res.status(404).send({});
    } else {
      const passwordFields = user.password.split("$");
      const salt = passwordFields[0];

      const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

      if (hash === passwordFields[1]) {
        req.body = {
          userId: user._id,
          userName: user.userName,
          email: user.email,
          permissionLevel: user.permissionLevel,
          provider: "email",
          firstName: user.firstName,
          lastName: user.lastName
        };
        return next();
      } else {
        return res.status(400).send({
          errors: ["Invalid e-mail or password"]
        });
      }
    }
  });
}

function isPasswordAndStaffMatch(req, res, next) {
  _staff.default.findOne({
    "email": req.body.email
  }).exec(function (err, staff) {
    if (err) res.status(500).send(err);

    if (!staff) {
      res.status(404).send({});
    } else {
      const passwordFields = staff.password.split("$");
      const salt = passwordFields[0];

      const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

      if (hash === passwordFields[1]) {
        req.body = {
          staffId: staff._id,
          staffName: staff.staffName,
          email: staff.email,
          permissionLevel: staff.permissionLevel,
          provider: "email",
          firstName: staff.firstName,
          lastName: staff.lastName
        };
        return next();
      } else {
        return res.status(400).send({
          errors: ["Invalid e-mail or password"]
        });
      }
    }
  });
}