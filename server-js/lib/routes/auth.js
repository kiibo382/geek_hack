"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _verify = require("../middlewares/auth/verify.js");

var _auth = require("../controllers/auth.js");

var _validation = require("../middlewares/users/validation.js");

var _validation2 = require("../middlewares/staff/validation.js");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/users", [_verify.hasAuthValidFields, _verify.isPasswordAndUserMatch, _auth.returnToken]);
router.post("/users/refresh", [_validation.validJWTNeeded, _validation.verifyRefreshBodyField, _validation.validRefreshNeeded, _auth.returnToken]);
router.post("/staff", [_verify.hasAuthValidFields, _verify.isPasswordAndStaffMatch, _auth.returnStaffToken]);
router.post("/staff/refresh", [_validation2.staffValidJWTNeeded, _validation2.staffVerifyRefreshBodyField, _validation2.staffValidRefreshNeeded, _auth.returnStaffToken]);
var _default = router;
exports.default = _default;