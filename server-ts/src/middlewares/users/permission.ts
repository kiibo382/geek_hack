import { envConfig } from "../../config/env.config";
const secret = envConfig.jwt_secret;
const ADMIN_PERMISSION = 4096;
import Express from "express"

export default {
  minimumPermissionLevelRequired: (required_permission_level: number) => {
    return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
      const user_permission_level = parseInt(req.jwt.permissionLevel);
      if (user_permission_level & required_permission_level) {
        return next();
      } else {
        return res.status(403).send();
      }
    };
  }
}
