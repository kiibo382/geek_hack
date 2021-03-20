import Users from "../models/users.js";
import Groups from "../models/groups.js";
import Staff from "../models/staff.js";
import envConfig from "../config/env.config.js";
const secret = envConfig.jwt_secret;
import crypto from "crypto";

export function registerGroup(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }
  const group = new Groups(req.body);
  group.save(function (err) {
    if (err) res.status(500).send(err);
    Staff.findOne({ "staffName": req.jwt.staffName })
      .exec(function (err, staff) {
        if (err) res.status(500).send(err);
        Groups.updateOne({ "groupName": req.body.groupName }, { $push: { "staff": staff._id } })
          .exec(function (err, result) {
            if (err) res.status(500).send(err);
            res.status(201).send(result);
          })
      })
    res.status(201).send();
  });
};

export function getGroupList(req, res) {
  const limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  Groups.find()
    .limit(perPage)
    .skip(perPage * page)
    .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function getByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function putByGroupName(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }
  Groups
    .findOneAndUpdate({ "groupName": groupName }, groupData)
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function removeByGroupName(req, res) {
  Groups
    .deleteOne({ "groupName": req.params.groupName })
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(204).send(result);
    })
}

export function getStaffByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .populate("staff")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function addStaffByGroupName(req, res) {
  Staff
    .findOne({ "staffName": req.body.staffName })
    .exec(function (err, staff) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "staff": staff._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function removeStaffByGroupName(req, res) {
  Staff
    .findOne({ "staffName": req.body.staffName })
    .exec(function (err, staff) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pop: { "staff": staff._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function getStaffApplicantByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .populate("staffApplicant")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function addStaffApplicantByGroupName(req, res) {
  Staff
    .findOne({ "staffName": req.body.staffName })
    .exec(function (err, staff) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "staffApplicant": staff._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function removeStaffApplicantByGroupName(req, res) {
  Staff
    .findOne({ "staffName": req.body.staffName })
    .exec(function (err, staff) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pop: { "staffApplicant": staff._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function getAmbassadorByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .populate("ambassador")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function addAmbassadorByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "ambassador": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function removeAmbassadorByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pop: { "ambassador": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function getAmbassadorApplicantByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .populate("ambassadorApplicant")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function addAmbassadorApplicantByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "ambassadorApplicant": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function removeAmbassadorApplicantByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pop: { "ambassadorApplicant": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}