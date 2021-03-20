import {
    insertStaff,
    getStaffSelf,
    getStaffList,
    staffLogin,
    staffLogout,
    getByStaffName,
    putByStaffName,
    removeByStaffName
} from "../controllers/staff.js";
import {
    hasAuthValidFields,
    isPasswordAndStaffMatch,
} from "../middlewares/auth/verify.js";
import { staffMinimumPermissionLevelRequired } from "../middlewares/staff/permission.js";
import { staffValidJWTNeeded } from "../middlewares/staff/validation.js";
import envConfig from "../config/env.config.js";
const userpermissionLevels = envConfig.permissionLevels;

const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

import express from "express";
const router = express.Router();

router.post("/", insertStaff);

router.get("/", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    getStaffList,
]);

router.post("/login", [
    hasAuthValidFields,
    isPasswordAndStaffMatch,
    staffLogin
]);

router.post("/logout", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    staffLogout,
]);

router.get("/self", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    getStaffSelf,
]);

router.put("/self", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    putByStaffName,
]);

router.delete("/self", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    removeByStaffName,
]);

router.get("/:userName", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    getByStaffName,
]);

export default router;
