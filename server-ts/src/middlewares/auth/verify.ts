import usersModels, { UserData } from "../../models/users";
import crypto from "crypto";
import Express from "express"


export default {
  hasAuthValidFields: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const errors = [];
    if (req.body) {
      if (!req.body.email) {
        errors.push("Missing email field");
      }
      if (!req.body.password) {
        errors.push("Missing password field");
      }

      if (errors.length) {
        return res.status(400).send({ errors: errors.join(",") });
      } else {
        return next();
      }
    } else {
      return res
        .status(400)
        .send({ errors: "Missing email and password fields" });
    }
  },
  isPasswordAndUserMatch: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    usersModels.findByEmail(req.body.email)
      .then((user: UserData) => {
        if (!user) {
          res.status(404).send({});
        } else {
          const passwordFields = user.password.split("$");
          const salt = passwordFields[0];
          const hash = crypto
            .createHmac("sha512", salt)
            .update(req.body.password)
            .digest("base64");
          if (hash === passwordFields[1]) {
            req.body = {
              userId: user._id,
              userName: user.userName,
              email: user.email,
              permissionLevel: user.permissionLevel,
              provider: "email",
              firstName: user.firstName,
              lastName: user.lastName,
            };
            return next();
          } else {
            return res.status(400).send({ errors: ["Invalid e-mail or password"] });
          }
        }
      });
  }
}
