import authVerify from "../middlewares/auth/verify";
import authController from "../controllers/auth";
import usersValidation from "../middlewares/users/validation";

import Express from "express";
const router: Express.Router = Express.Router();

router.post("/",
  [authVerify.hasAuthValidFields,
    authVerify.isPasswordAndUserMatch,
    authController.returnToken
]);

router.post("/refresh", [
  usersValidation.validJWTNeeded,
  usersValidation.verifyRefreshBodyField,
  usersValidation.validRefreshNeeded,
  authController.returnToken,
]);

export default router;
