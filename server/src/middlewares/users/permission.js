import envConfig from "../../config/env.config.js";
const secret = envConfig.jwt_secret;
const ADMIN_PERMISSION = 4096;

export function minimumPermissionLevelRequired(required_permission_level) {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.jwt.permissionLevel);
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
}
