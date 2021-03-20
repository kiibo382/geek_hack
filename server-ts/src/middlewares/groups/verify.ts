import groupsModels, { GroupData } from "../../models/groups"
import usersModels, { UserData } from "../../models/users"
import Express from "express"

export default {
    isGroupMember: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        usersModels.findByUserName(req.jwt.userName)
            .then((user: UserData) => {
                groupsModels.getMemberIds(req.params.groupName)
                    .then((result: any) => {
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
}