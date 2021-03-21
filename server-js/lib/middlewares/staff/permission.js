"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staffMinimumPermissionLevelRequired = staffMinimumPermissionLevelRequired;

var _envConfig = _interopRequireDefault(require("../../config/env.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staffSecret = _envConfig.default.jwt_staff_secret;
const ADMIN_PERMISSION = 4096;

function staffMinimumPermissionLevelRequired(required_permission_level) {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.jwt.permissionLevel);

    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
}