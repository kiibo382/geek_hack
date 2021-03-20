import {
    registerGroup,
    getGroupList,
    getByGroupName,
    putByGroupName,
    removeByGroupName,
    getMembersByGroupName,
    addMemberByGroupName,
    removeMemberByGroupName,
    getApplicantsByGroupName,
    addApplicantByGroupName,
    removeApplicantByGroupName
} from "../controllers/groups.js";
import { isGroupMember } from "../middlewares/groups/verify.js"
import { alreadyGroupMember } from "../middlewares/groups/validation.js"
import { minimumPermissionLevelRequired } from "../middlewares/users/permission.js";
import { validJWTNeeded } from "../middlewares/users/validation.js";
import envConfig from "../config/env.config.js";
const userPermissionLevels = envConfig.permissionLevels;

const ADMIN = userPermissionLevels.ADMIN;
const PAID = userPermissionLevels.PAID_USER;
const FREE = userPermissionLevels.NORMAL_USER;

import express from "express";
const router = express.Router();

router.post("/", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    registerGroup,
]);

router.get("/", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getGroupList,
]);

router.get("/:groupName", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getByGroupName,
]);

router.put("/:groupName", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    putByGroupName,
]);

router.delete("/:groupName", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeByGroupName,
]);

router.get("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getMembersByGroupName,
]);

router.post("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    alreadyGroupMember,
    addMemberByGroupName,
    removeApplicantByGroupName
]);

router.delete("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeMemberByGroupName
]);

router.post("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    alreadyGroupMember,
    addApplicantByGroupName
]);

router.get("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    getApplicantsByGroupName
]);

router.delete("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeApplicantByGroupName
]);

export default router;
