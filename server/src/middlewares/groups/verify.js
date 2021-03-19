import { getMemberIds } from "../../models/groups.js"
import { findByUserName } from "../../models/users.js"

export function isGroupMember(req, res, next) {
    findByUserName(req.jwt.userName).then((user) => {
        getMemberIds(req.params.groupName).then((result) => {
            if (result.members.includes(user._id)) {
                next()
            } else {
                return res
                    .status(403)
                    .send({ errors: "You are not group member." });
            }
        })
    })
}