import Users from "../../models/users.js"
import Groups from "../../models/groups.js"
import Staff from "../../models/staff.js"

export function isAlreadyStaff(req, res, next) {
    Staff
        .findOne({ "staffName": req.jwt.staffName })
        .exec(function (err, staff) {
            if (err) res.status(500).send(err);
            Groups
                .findOne({ "groupName": req.params.groupName })
                .exec(function (err, group) {
                    if (err) res.status(500).send(err);
                    if (group.staff.includes(staff._id)) {
                        return res
                            .status(403)
                            .send({ errors: "You are already group member." });
                    } else {
                        next()
                    }
                })
        })
}

export function isAlreadyAmbassador(req, res, next) {
    Users
        .findOne({ "userName": req.jwt.userName })
        .exec(function (err, user) {
            if (err) res.status(500).send(err);
            Groups
                .findOne({ "groupName": req.params.groupName })
                .exec(function (err, group) {
                    if (err) res.status(500).send(err);
                    if (group.staff.includes(user._id)) {
                        return res
                            .status(403)
                            .send({ errors: "You are already group ambassador." });
                    } else {
                        next()
                    }
                })
        })
}