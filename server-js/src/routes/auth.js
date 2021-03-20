import {
  hasAuthValidFields,
  isPasswordAndUserMatch,
} from "../middlewares/auth/verify.js";
import { returnToken } from "../controllers/auth.js";
import {
  validJWTNeeded,
  verifyRefreshBodyField,
  validRefreshNeeded,
} from "../middlewares/users/validation.js";

import express from "express";
const router = express.Router();

router.post("/", [hasAuthValidFields, isPasswordAndUserMatch, returnToken]);

router.post("/refresh", [
  validJWTNeeded,
  verifyRefreshBodyField,
  validRefreshNeeded,
  returnToken,
]);

export default router;
