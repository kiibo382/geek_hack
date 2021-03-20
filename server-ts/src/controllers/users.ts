import usersModels, { UserData } from "../models/users";
import Express from "express"
import { envConfig } from "../config/env.config";
const secret = envConfig.jwt_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

export default {
  insertUser: (req: Express.Request, res: Express.Response) => {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    usersModels.createUser(req.body)
      .then(() => {
        res.status(201).send();
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  },
  getUserList: (req: Express.Request, res: Express.Response) => {
    const limit = 100;
    const page = 10;
    usersModels.userList(limit, page)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  },
  login: (req: Express.Request, res: Express.Response) => {
    try {
      const refreshId = req.body.email + secret;
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");
      req.body.refreshKey = salt;
      const token: string = jsonwebtoken.sign(req.body, secret);
      const b = Buffer.from(hash);
      const refresh_token: string = b.toString("base64");
      req.session.token = `Bearer ${token}`;
      res.status(200).send();
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  },
  logout: (req: Express.Request, res: Express.Response) => {
    if (req.session.token) {
      req.session.token = "";
      res.status(200).send();
    } else {
      return res.status(401).send();
    }
  },
  getSelf: (req: Express.Request, res: Express.Response) => {
    usersModels.findByUserName(req.jwt.userName)
      .then((result: UserData) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      })
      .catch((e: any) => {
        res.status(500).send(e)
      })
  },
  getByUserName: (req: Express.Request, res: Express.Response) => {
    usersModels.findByUserName(req.params.userName)
      .then((result: UserData) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      })
      .catch((e: any) => {
        res.status(500).send(e)
      })
  },
  putByUserName: (req: Express.Request, res: Express.Response) => {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      req.body.password = salt + "$" + hash;
    }
    usersModels.putUser(req.jwt.userName, req.body)
      .then(() => {
        res.status(204).send();
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  },
  removeByUserName: (req: Express.Request, res: Express.Response) => {
    usersModels.removeUser(req.jwt.userName)
      .then((result) => {
        req.session.token = "";
        res.status(204).send(result);
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  }
}

