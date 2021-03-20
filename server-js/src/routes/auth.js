import {
  hasAuthValidFields,
  isPasswordAndUserMatch,
  isPasswordAndStaffMatch
} from "../middlewares/auth/verify.js";
import { returnToken, returnStaffToken } from "../controllers/auth.js";
import {
  validJWTNeeded,
  verifyRefreshBodyField,
  validRefreshNeeded,
} from "../middlewares/users/validation.js";
import {
  staffValidJWTNeeded,
  staffVerifyRefreshBodyField,
  staffValidRefreshNeeded
} from "../middlewares/staff/validation.js";

import express from "express";
const router = express.Router();

router.post("/users", [
  hasAuthValidFields,
  isPasswordAndUserMatch,
  returnToken
]);

router.post("/users/refresh", [
  validJWTNeeded,
  verifyRefreshBodyField,
  validRefreshNeeded,
  returnToken,
]);

router.post("/staff", [
  hasAuthValidFields,
  isPasswordAndStaffMatch,
  returnStaffToken
]);

router.post("/staff/refresh", [
  staffValidJWTNeeded,
  staffVerifyRefreshBodyField,
  staffValidRefreshNeeded,
  returnStaffToken,
]);

export default router;
