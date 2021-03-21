"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _groups = require("../controllers/groups.js");

var _verify = require("../middlewares/groups/verify.js");

var _validation = require("../middlewares/groups/validation.js");

var _permission = require("../middlewares/users/permission.js");

var _validation2 = require("../middlewares/users/validation.js");

var _permission2 = require("../middlewares/staff/permission.js");

var _validation3 = require("../middlewares/staff/validation.js");

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userPermissionLevels = _envConfig.default.permissionLevels;
const ADMIN = userPermissionLevels.ADMIN;
const PAID = userPermissionLevels.PAID_USER;
const FREE = userPermissionLevels.NORMAL_USER;

const router = _express.default.Router();

router.post("/", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _groups.registerGroup]);
router.get("/", [_validation2.validJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _groups.getGroupList]);
router.get("/:groupName", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.getByGroupName]);
router.put("/:groupName", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.putByGroupName]);
router.delete("/:groupName", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.removeByGroupName]);
router.get("/:groupName/staff", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.getStaffByGroupName]);
router.post("/:groupName/staff", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _validation.isAlreadyStaff, _groups.addStaffByGroupName, _groups.removeStaffApplicantByGroupName]);
router.delete("/:groupName/staff", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.removeStaffByGroupName]);
router.get("/:groupName/staffApplicant", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _groups.getStaffApplicantByGroupName]);
router.post("/:groupName/staffApplicant", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _validation.isAlreadyStaff, _groups.addStaffApplicantByGroupName, _groups.removeStaffApplicantByGroupName]);
router.delete("/:groupName/staffApplicant", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.removeStaffApplicantByGroupName]);
router.post("/:groupName/ambassador", [_validation3.staffValidJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.addAmbassadorByGroupName]);
router.get("/:groupName/ambassador", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.getAmbassadorByGroupName]);
router.delete("/:groupName/ambassador", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.removeAmbassadorByGroupName]);
router.post("/:groupName/ambassadorApplicant", [_validation3.staffValidJWTNeeded, (0, _permission.minimumPermissionLevelRequired)(FREE), _validation.isAlreadyAmbassador, _groups.addAmbassadorApplicantByGroupName]);
router.get("/:groupName/ambassadorApplicant", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.getAmbassadorApplicantByGroupName]);
router.delete("/:groupName/ambassadorApplicant", [_validation3.staffValidJWTNeeded, (0, _permission2.staffMinimumPermissionLevelRequired)(FREE), _verify.isStaff, _groups.removeAmbassadorApplicantByGroupName]);
var _default = router;
exports.default = _default;