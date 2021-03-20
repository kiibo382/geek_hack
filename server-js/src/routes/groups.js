import {
    registerGroup,
    getGroupList,
    getByGroupName,
    putByGroupName,
    removeByGroupName,
    getStaffByGroupName,
    addStaffByGroupName,
    removeStaffByGroupName,
    getStaffApplicantByGroupName,
    addStaffApplicantByGroupName,
    removeStaffApplicantByGroupName,
    getAmbassadorByGroupName,
    addAmbassadorByGroupName,
    removeAmbassadorByGroupName,
    getAmbassadorApplicantByGroupName,
    addAmbassadorApplicantByGroupName,
    removeAmbassadorApplicantByGroupName,
} from "../controllers/groups.js";
import { isStaff, isAmbassador } from "../middlewares/groups/verify.js"
import { isAlreadyStaff, isAlreadyAmbassador } from "../middlewares/groups/validation.js"
import { minimumPermissionLevelRequired } from "../middlewares/users/permission.js";
import { validJWTNeeded } from "../middlewares/users/validation.js";
import { staffMinimumPermissionLevelRequired } from "../middlewares/staff/permission.js";
import { staffValidJWTNeeded } from "../middlewares/staff/validation.js";
import envConfig from "../config/env.config.js";
const userPermissionLevels = envConfig.permissionLevels;

const ADMIN = userPermissionLevels.ADMIN;
const PAID = userPermissionLevels.PAID_USER;
const FREE = userPermissionLevels.NORMAL_USER;

import express from "express";
const router = express.Router();

router.post("/", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    registerGroup,
]);

router.get("/", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getGroupList,
]);

router.get("/:groupName", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    getByGroupName,
]);

router.put("/:groupName", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    putByGroupName,
]);

router.delete("/:groupName", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    removeByGroupName,
]);

router.get("/:groupName/staff", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    getStaffByGroupName,
]);

router.post("/:groupName/staff", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isAlreadyStaff,
    addStaffByGroupName,
    removeStaffApplicantByGroupName
]);

router.delete("/:groupName/staff", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    removeStaffByGroupName
]);

router.get("/:groupName/staffApplicant", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    getStaffApplicantByGroupName,
]);

router.post("/:groupName/staffApplicant", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isAlreadyStaff,
    addStaffApplicantByGroupName,
    removeStaffApplicantByGroupName
]);

router.delete("/:groupName/staffApplicant", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    removeStaffApplicantByGroupName
]);

router.post("/:groupName/ambassador", [
    staffValidJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isStaff,
    addAmbassadorByGroupName
]);

router.get("/:groupName/ambassador", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    getAmbassadorByGroupName
]);

router.delete("/:groupName/ambassador", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    removeAmbassadorByGroupName
]);

router.post("/:groupName/ambassadorApplicant", [
    staffValidJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isAlreadyAmbassador,
    addAmbassadorApplicantByGroupName
]);

router.get("/:groupName/ambassadorApplicant", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    getAmbassadorApplicantByGroupName
]);

router.delete("/:groupName/ambassadorApplicant", [
    staffValidJWTNeeded,
    staffMinimumPermissionLevelRequired(FREE),
    isStaff,
    removeAmbassadorApplicantByGroupName
]);

export default router;
