"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGroup = registerGroup;
exports.getGroupList = getGroupList;
exports.getByGroupName = getByGroupName;
exports.putByGroupName = putByGroupName;
exports.removeByGroupName = removeByGroupName;
exports.getStaffByGroupName = getStaffByGroupName;
exports.addStaffByGroupName = addStaffByGroupName;
exports.removeStaffByGroupName = removeStaffByGroupName;
exports.getStaffApplicantByGroupName = getStaffApplicantByGroupName;
exports.addStaffApplicantByGroupName = addStaffApplicantByGroupName;
exports.removeStaffApplicantByGroupName = removeStaffApplicantByGroupName;
exports.getAmbassadorByGroupName = getAmbassadorByGroupName;
exports.addAmbassadorByGroupName = addAmbassadorByGroupName;
exports.removeAmbassadorByGroupName = removeAmbassadorByGroupName;
exports.getAmbassadorApplicantByGroupName = getAmbassadorApplicantByGroupName;
exports.addAmbassadorApplicantByGroupName = addAmbassadorApplicantByGroupName;
exports.removeAmbassadorApplicantByGroupName = removeAmbassadorApplicantByGroupName;

require("core-js/modules/es.regexp.to-string.js");

var _users = _interopRequireDefault(require("../models/users.js"));

var _groups = _interopRequireDefault(require("../models/groups.js"));

var _staff = _interopRequireDefault(require("../models/staff.js"));

var _envConfig = _interopRequireDefault(require("../config/env.config.js"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = _envConfig.default.jwt_secret;

function registerGroup(req, res) {
  if (req.body.password) {
    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

    req.body.password = salt + "$" + hash;
  }

  const group = new _groups.default(req.body);
  group.save(function (err) {
    if (err) res.status(500).send(err);

    _staff.default.findOne({
      "staffName": req.jwt.staffName
    }).exec(function (err, staff) {
      if (err) res.status(500).send(err);

      _groups.default.updateOne({
        "groupName": req.body.groupName
      }, {
        $push: {
          "staff": staff._id
        }
      }).exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(201).send(result);
      });
    });

    res.status(201).send();
  });
}

;

function getGroupList(req, res) {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  _groups.default.find().limit(perPage).skip(perPage * page).select("groupName emailDomain urls intern newCareer midCareer industry profile members").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function getByGroupName(req, res) {
  _groups.default.findOne({
    "groupName": req.params.groupName
  }).select("groupName emailDomain urls intern newCareer midCareer industry profile members").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function putByGroupName(req, res) {
  if (req.body.password) {
    const salt = _crypto.default.randomBytes(16).toString("base64");

    const hash = _crypto.default.createHmac("sha512", salt).update(req.body.password).digest("base64");

    req.body.password = salt + "$" + hash;
  }

  _groups.default.findOneAndUpdate({
    "groupName": groupName
  }, groupData).exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function removeByGroupName(req, res) {
  _groups.default.deleteOne({
    "groupName": req.params.groupName
  }).exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(204).send(result);
  });
}

function getStaffByGroupName(req, res) {
  _groups.default.findOne({
    "groupName": req.params.groupName
  }).populate("staff").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function addStaffByGroupName(req, res) {
  _staff.default.findOne({
    "staffName": req.body.staffName
  }).exec(function (err, staff) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $push: {
        "staff": staff._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function removeStaffByGroupName(req, res) {
  _staff.default.findOne({
    "staffName": req.body.staffName
  }).exec(function (err, staff) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $pop: {
        "staff": staff._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function getStaffApplicantByGroupName(req, res) {
  _groups.default.findOne({
    "groupName": req.params.groupName
  }).populate("staffApplicant").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function addStaffApplicantByGroupName(req, res) {
  _staff.default.findOne({
    "staffName": req.body.staffName
  }).exec(function (err, staff) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $push: {
        "staffApplicant": staff._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function removeStaffApplicantByGroupName(req, res) {
  _staff.default.findOne({
    "staffName": req.body.staffName
  }).exec(function (err, staff) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $pop: {
        "staffApplicant": staff._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function getAmbassadorByGroupName(req, res) {
  _groups.default.findOne({
    "groupName": req.params.groupName
  }).populate("ambassador").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function addAmbassadorByGroupName(req, res) {
  _users.default.findOne({
    "userName": req.body.userName
  }).exec(function (err, user) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $push: {
        "ambassador": user._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function removeAmbassadorByGroupName(req, res) {
  _users.default.findOne({
    "userName": req.body.userName
  }).exec(function (err, user) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $pop: {
        "ambassador": user._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function getAmbassadorApplicantByGroupName(req, res) {
  _groups.default.findOne({
    "groupName": req.params.groupName
  }).populate("ambassadorApplicant").exec(function (err, result) {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
}

function addAmbassadorApplicantByGroupName(req, res) {
  _users.default.findOne({
    "userName": req.body.userName
  }).exec(function (err, user) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $push: {
        "ambassadorApplicant": user._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}

function removeAmbassadorApplicantByGroupName(req, res) {
  _users.default.findOne({
    "userName": req.body.userName
  }).exec(function (err, user) {
    if (err) res.status(500).send(err);

    _groups.default.updateOne({
      "groupName": req.params.groupName
    }, {
      $pop: {
        "ambassadorApplicant": user._id
      }
    }).exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  });
}