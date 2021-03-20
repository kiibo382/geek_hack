import groupsModels from "../models/groups";
import { envConfig } from "../config/env.config";
const secret = envConfig.jwt_secret;
import crypto from "crypto";
import Express from "express"

export default {
  registerGroup: (req: Express.Request, res: Express.Response) => {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      req.body.password = salt + "$" + hash;
    }
    try {
      groupsModels.createGroup(req.body)
        .catch((err) => {
          res.status(500).send(err)
        })
    } catch (err) {
      res.status(500).send(err)
    }
    groupsModels.addMember(req.body.groupName, req.jwt.userName)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  getGroupList: (req: Express.Request, res: Express.Response) => {
    const limit: number = 100
    const page: number = 10
    groupsModels.groupList(limit, page)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  getByGroupName: (req: Express.Request, res: Express.Response) => {
    try {
      groupsModels.findByGroupName(req.params.groupName).then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  },
  putByGroupName: (req: Express.Request, res: Express.Response) => {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      req.body.password = salt + "$" + hash;
    }

    groupsModels.putGroup(req.params.groupName, req.body).then((result) => {
      res.status(204).send({});
    });
  },
  removeByGroupName: (req: Express.Request, res: Express.Response) => {
    groupsModels.removeGroup(req.params.groupName).then((result) => {
      res.status(204).send(result);
    });
  },
  getMembersByGroupName: (req: Express.Request, res: Express.Response) => {
    try {
      groupsModels.getMembers(req.params.groupName).then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  },
  getApplicantsByGroupName: (req: Express.Request, res: Express.Response) => {
    try {
      groupsModels.getApplicants(req.params.groupName).then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  },
  addMemberByGroupName: (req: Express.Request, res: Express.Response) => {
    groupsModels.addMember(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  removeMemberByGroupName: (req: Express.Request, res: Express.Response) => {
    groupsModels.removeMember(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  addApplicantByGroupName: (req: Express.Request, res: Express.Response) => {
    groupsModels.addApplicant(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  removeApplicantByGroupName: (req: Express.Request, res: Express.Response) => {
    groupsModels.removeApplicant(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
}
