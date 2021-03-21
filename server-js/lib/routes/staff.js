"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _staff = require("../controllers/staff.js");

var _verify = require("../middlewares/auth/verify.js");

var _permission = require("../middlewares/staff/permission.js");

var _validation = require("../middlewares/staff/validation.js");

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userpermissionLevels = _envConfig.default.permissionLevels;
const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

const router = _express.default.Router();

router.post("/", _staff.insertStaff);
router.get("/", [_validation.staffValidJWTNeeded, (0, _permission.staffMinimumPermissionLevelRequired)(FREE), _staff.getStaffList]);
router.post("/login", [_verify.hasAuthValidFields, _verify.isPasswordAndStaffMatch, _staff.staffLogin]);
router.post("/logout", [_validation.staffValidJWTNeeded, (0, _permission.staffMinimumPermissionLevelRequired)(FREE), _staff.staffLogout]);
router.get("/self", [_validation.staffValidJWTNeeded, (0, _permission.staffMinimumPermissionLevelRequired)(FREE), _staff.getStaffSelf]);
router.put("/self", [_validation.staffValidJWTNeeded, (0, _permission.staffMinimumPermissionLevelRequired)(FREE), _staff.putByStaffName]);
router.delete("/self", [_validation.staffValidJWTNeeded, (0, _permission.staffMinimumPermissionLevelRequired)(FREE), _staff.removeByStaffName]);
router.get("/:userName", [_validation.staffValidJWTNeeded, (0, _permission.staffMinimumPermissionLevelRequired)(FREE), _staff.getByStaffName]);
var _default = router;
exports.default = _default;