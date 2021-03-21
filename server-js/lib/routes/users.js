"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = require("../controllers/users.js");

var _verify = require("../middlewares/auth/verify.js");

var _permission = require("../middlewares/users/permission.js");

var _validation = require("../middlewares/users/validation.js");

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userpermissionLevels = _envConfig.default.permissionLevels;
const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

const router = _express.default.Router();

router.post("/", _users.insertUser);
router.get("/", [_validation.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _users.getUserList]);
router.post("/login", [_verify.hasAuthValidFields, _verify.isPasswordAndUserMatch, _users.login]);
router.post("/logout", [_validation.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _users.logout]);
router.get("/self", [_validation.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _users.getSelf]);
router.put("/self", [_validation.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _users.putByUserName]);
router.delete("/self", [_validation.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _users.removeByUserName]);
router.get("/:userName", [_validation.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _users.getByUserName]);
var _default = router;
exports.default = _default;