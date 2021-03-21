"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAlreadyStaff = isAlreadyStaff;
exports.isAlreadyAmbassador = isAlreadyAmbassador;

require("core-js/modules/es.string.includes.js");

var _users = _interopRequireDefault(require("../../models/users.js"));

var _groups = _interopRequireDefault(require("../../models/groups.js"));

var _staff = _interopRequireDefault(require("../../models/staff.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlreadyStaff(req, res, next) {
  _staff.default.findOne({
    "staffName": req.jwt.staffName
  }).exec(function (err, staff) {
    if (err) res.status(500).send(err);

    _groups.default.findOne({
      "groupName": req.params.groupName
    }).exec(function (err, group) {
      if (err) res.status(500).send(err);

      if (group.staff.includes(staff._id)) {
        return res.status(403).send({
          errors: "You are already group member."
        });
      } else {
        next();
      }
    });
  });
}

function isAlreadyAmbassador(req, res, next) {
  _users.default.findOne({
    "userName": req.jwt.userName
  }).exec(function (err, user) {
    if (err) res.status(500).send(err);

    _groups.default.findOne({
      "groupName": req.params.groupName
    }).exec(function (err, group) {
      if (err) res.status(500).send(err);

      if (group.staff.includes(user._id)) {
        return res.status(403).send({
          errors: "You are already group ambassador."
        });
      } else {
        next();
      }
    });
  });
}