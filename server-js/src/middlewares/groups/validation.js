import { getMemberIds } from "../../models/groups.js"
import { findByUserName } from "../../models/users.js"

export function alreadyGroupMember(req, res, next) {
    findByUserName(req.jwt.userName).then((user) => {
        getMemberIds(req.params.groupName).then((result) => {
            if (result.members.includes(user._id)) {
                return res
                    .status(403)
                    .send({ errors: "You are already group member." });
            } else {
                next()
            }
        })
    })
}