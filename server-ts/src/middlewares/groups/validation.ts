import groupsModels, { GroupData } from "../../models/groups"
import usersModels, { UserData } from "../../models/users"
import Express from "express"

export default {
    alreadyGroupMember: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        usersModels.findByUserName(req.jwt.userName)
            .then((user: UserData) => {
                groupsModels.getMemberIds(req.params.groupName).then((result: any) => {
                    if (result.members.includes(user._id)) {
                        return res
                            .status(403)
                            .send({ errors: "You are already group member." });
                    } else {
                        next()
                    }
                })
            })
            .catch((e: any) => {
                res.status(500).send(e)
            })
    }
}
