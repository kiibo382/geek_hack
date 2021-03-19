import groupsModels from "../models/groups";
import { envConfig } from "../config/env.config";
const secret = envConfig.jwt_secret;
import crypto from "crypto";

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
      createGroup(req.body)
    } catch (err) {
      res.status(500).send(err)
    }
    addMember(req.body.groupName, req.jwt.userName)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  }
  
  export function getGroupList(req: Express.Request, res: Express.Response) {
    const limit =
      req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    const page = 0;
    if (req.query) {
      if (req.query.page) {
        req.query.page = parseInt(req.query.page);
        page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
    }
    groupList(limit, page).then((result) => {
      res.status(200).send(result);
    });
  }
  
  export function getByGroupName(req: Express.Request, res: Express.Response) {
    try {
      findByGroupName(req.params.groupName).then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  }
  
  export function putByGroupName(req: Express.Request, res: Express.Response) {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      req.body.password = salt + "$" + hash;
    }
  
    putGroup(req.params.groupName, req.body).then((result) => {
      res.status(204).send({});
    });
  }
  
  export function removeByGroupName(req: Express.Request, res: Express.Response) {
    removeGroup(req.params.groupName).then((result) => {
      res.status(204).send(result);
    });
  }
  
  export function getMembersByGroupName(req: Express.Request, res: Express.Response) {
    try {
      getMembers(req.params.groupName).then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  }
  
  export function getApplicantsByGroupName(req: Express.Request, res: Express.Response) {
    try {
      getApplicants(req.params.groupName).then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  }
  
  export function addMemberByGroupName(req: Express.Request, res: Express.Response) {
    addMember(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
  
  export function removeMemberByGroupName(req: Express.Request, res: Express.Response) {
    removeMember(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
  
  export function addApplicantByGroupName(req: Express.Request, res: Express.Response) {
    addApplicant(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
  
  export function removeApplicantByGroupName(req: Express.Request, res: Express.Response) {
    removeApplicant(req.params.groupName, req.body.userName)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
  
}
