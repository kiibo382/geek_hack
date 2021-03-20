import Users from "../../models/users.js";
import Staff from "../../models/staff.js";
import crypto from "crypto";

export function hasAuthValidFields(req, res, next) {
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
}

export function isPasswordAndUserMatch(req, res, next) {
  Users
    .findOne({ "email": req.body.email })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
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
    })
}

export function isPasswordAndStaffMatch(req, res, next) {
  Staff
    .findOne({ "email": req.body.email })
    .exec(function (err, staff) {
      if (err) res.status(500).send(err);
      if (!staff) {
        res.status(404).send({});
      } else {
        const passwordFields = staff.password.split("$");
        const salt = passwordFields[0];
        const hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            staffId: staff._id,
            staffName: staff.staffName,
            email: staff.email,
            permissionLevel: staff.permissionLevel,
            provider: "email",
            firstName: staff.firstName,
            lastName: staff.lastName,
          };
          return next();
        } else {
          return res.status(400).send({ errors: ["Invalid e-mail or password"] });
        }
      }
    })
}
