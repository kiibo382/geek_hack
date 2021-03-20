import usersController from "../controllers/users";
import authVerify from "../middlewares/auth/verify";
import usersPermission from "../middlewares/users/permission";
import usersValidation from "../middlewares/users/validation";
import { envConfig } from "../config/env.config.js";
const userpermissionLevels = envConfig.permissionLevels;

const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

import Express from "express";
const router: Express.Router = Express.Router();

router.post("/", usersController.insertUser);

router.get("/", [
  usersValidation.validJWTNeeded,
  usersPermission.minimumPermissionLevelRequired(FREE),
  usersController.getUserList,
]);

router.post("/login", [
  authVerify.hasAuthValidFields,
  authVerify.isPasswordAndUserMatch,
  usersController.login]);

router.post("/logout", [
  usersValidation.validJWTNeeded,
  usersPermission.minimumPermissionLevelRequired(FREE),
  usersController.logout,
]);

router.get("/self", [
  usersValidation.validJWTNeeded,
  usersPermission.minimumPermissionLevelRequired(FREE),
  usersController.getSelf,
]);

router.put("/self", [
  usersValidation.validJWTNeeded,
  usersPermission.minimumPermissionLevelRequired(FREE),
  usersController.putByUserName,
]);

router.delete("/self", [
  usersValidation.validJWTNeeded,
  usersPermission.minimumPermissionLevelRequired(FREE),
  usersController.removeByUserName,
]);

router.get("/:userName", [
  usersValidation.validJWTNeeded,
  usersPermission.minimumPermissionLevelRequired(FREE),
  usersController.getByUserName,
]);

export default router;