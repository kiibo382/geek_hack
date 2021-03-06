import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.config";
const secret = envConfig.jwt_secret;
import crypto from "crypto";
import pkg from "morgan";
const { token } = pkg;
import Express from "express"

export default {
  verifyRefreshBodyField: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if (req.body && req.body.refresh_token) {
      return next();
    } else {
      return res.status(400).send({ error: "need to pass refresh_token field" });
    }
  },
  validRefreshNeeded: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const b = Buffer.from(req.body.refresh_token, "base64");
    const refresh_token = b.toString();
    const hash = crypto
      .createHmac("sha512", req.jwt.refreshKey)
      .update(`${req.jwt.userId}${secret}`)
      .digest("base64");
    if (hash === refresh_token) {
      req.body = req.jwt;
      return next();
    } else {
      return res.status(400).send({ error: "Invalid refresh token" });
    }
  },
  validJWTNeeded: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if (req.session.token) {
      var bearerToken: string = req.session.token;
    } else if (req.headers["authorization"]) {
      var bearerToken: string = req.headers["authorization"];
    } else {
      return res.status(401).send();
    }
    try {
      const authorization = bearerToken.split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  }
}
