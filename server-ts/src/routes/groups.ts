import groupsController from "../controllers/groups";
import groupVerify from "../middlewares/groups/verify"
import groupsValidation from "../middlewares/groups/validation"
import usersPermission from "../middlewares/users/permission";
import usersValidation from "../middlewares/users/validation";
import { envConfig } from "../config/env.config";
const userPermissionLevels = envConfig.permissionLevels;

const ADMIN = userPermissionLevels.ADMIN;
const PAID = userPermissionLevels.PAID_USER;
const FREE = userPermissionLevels.NORMAL_USER;

import Express from "express";
const router = Express.Router();

router.post("/", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupsController.registerGroup,
]);

router.get("/", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupsController.getGroupList,
]);

router.get("/:groupName", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupsController.getByGroupName,
]);

router.put("/:groupName", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupVerify.isGroupMember,
    groupsController.putByGroupName,
]);

router.delete("/:groupName", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupVerify.isGroupMember,
    groupsController.removeByGroupName,
]);

router.get("/:groupName/members", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupsController.getMembersByGroupName,
]);

router.post("/:groupName/members", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupsValidation.alreadyGroupMember,
    groupsController.addMemberByGroupName,
    groupsController.removeApplicantByGroupName
]);

router.delete("/:groupName/members", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupVerify.isGroupMember,
    groupsController.removeMemberByGroupName
]);

router.post("/:groupName/applicants", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupsValidation.alreadyGroupMember,
    groupsController.addApplicantByGroupName
]);

router.get("/:groupName/applicants", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupVerify.isGroupMember,
    groupsController.getApplicantsByGroupName
]);

router.delete("/:groupName/applicants", [
    usersValidation.validJWTNeeded,
    usersPermission.minimumPermissionLevelRequired(FREE),
    groupVerify.isGroupMember,
    groupsController.removeApplicantByGroupName
]);

export default router;
