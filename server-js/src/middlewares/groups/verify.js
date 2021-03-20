import Users from "../../models/users.js"
import Groups from "../../models/groups.js"
import Staff from "../../models/staff.js"

export function isStaff(req, res, next) {
    Staff
        .findOne({ "staffName": req.jwt.staffName })
        .exec(function (err, staff) {
            if (err) res.status(500).send(err);
            Groups
                .findOne({ "groupName": req.params.groupName })
                .exec(function (err, group) {
                    if (err) res.status(500).send(err);
                    if (group.staff.includes(staff._id)) {
                        next()
                    } else {
                        return res
                            .status(403)
                            .send({ errors: "You are not group member." });
                    }
                })
        })
}

export function isAmbassador(req, res, next) {
    Users
        .findOne({ "userName": req.jwt.userName })
        .exec(function (err, user) {
            if (err) res.status(500).send(err);
            Groups
                .findOne({ "groupName": req.params.groupName })
                .exec(function (err, group) {
                    if (err) res.status(500).send(err);
                    if (group.ambassador.includes(user._id)) {
                        next()
                    } else {
                        return res
                            .status(403)
                            .send({ errors: "You are not group ambassador." });
                    }
                })
        })
}
