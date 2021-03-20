import Staff from "../models/staff.js";
import envConfig from "../config/env.config.js";
const staffSecret = envConfig.jwt_staff_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

export function insertStaff(req, res) {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  const staff = new Staff(req.body);
  staff.save(function (err) {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
}

export function getStaffList(req, res) {
  const limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  Staff
    .find()
    .limit(limit)
    .skip(page)
    .select("staffName firstName lastName email")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function staffLogin(req, res) {
  try {
    const refreshId = req.body.email + staffSecret;
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    const token = jsonwebtoken.sign(req.body, staffSecret);
    const b = Buffer.from(hash);
    const refresh_token = b.toString("base64");
    req.session.token = `Bearer ${token}`;
      res.status(200).send({ refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function staffLogout(req, res) {
  if (req.session.token) {
    req.session.token = "";
    res.status(200).send();
  } else {
    return res.status(401).send();
  }
}

export function getStaffSelf(req, res) {
  Staff
    .findOne({ "staffName": req.jwt.staffName })
    .select(
      "userName firstName lastName email"
    )
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function getByStaffName(req, res) {
  Staff
    .findOne({ "staffName": req.params.staffName })
    .select(
      "userName firstName lastName email"
    )
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function putByStaffName(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

  Staff
    .findOneAndUpdate({ "staffName": req.jwt.staffName }, req.body)
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function removeByStaffName(req, res) {
  Staff
    .deleteOne({ "staffName": staffName })
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      req.session.token = "";
      res.status(204).send(result);
    })
}
