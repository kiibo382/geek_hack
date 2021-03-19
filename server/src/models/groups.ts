import mongoose, { Schema } from "mongoose";
import usersModels from "./users"


const urlsSchema: Schema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
})

const groupsSchema: Schema = new Schema({
    groupName: {
        type: String,
        unique: true,
        required: true,
    },
    emailDomain: {
        type: String,
        unique: true
    },
    password: String,
    urls: [urlsSchema],
    intern: {
        type: Boolean,
        default: false
    },
    newCareer: {
        type: Boolean,
        default: false
    },
    midCareer: {
        type: Boolean,
        default: false
    },
    industry: String,
    profile: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    applicants: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

export interface Urls {
    name: String
    url: String
};

export interface GroupData {
    groupName: String
    emailDomain: String
    password: String
    urls: [Urls]
    intern: Boolean
    newCareer: Boolean
    midCareer: Boolean
    industry: String
    profile: String
    members: String[]
    applicants: String[]
};

export const Groups = mongoose.model("Groups", groupsSchema);

export default {
    findByGroupName: (groupName: string) => {
        return new Promise((resolve, reject) => {
            Groups.findOne({ "groupName": groupName })
                .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
                .exec(function (err, group) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(group);
                    }
                });
        })
    },
    createGroup: (groupData: GroupData) => {
        const group = new Groups(groupData);
        return group.save();
    },
    groupList: (perPage: number, page: number) => {
        return new Promise((resolve, reject) => {
            Groups.find()
                .limit(perPage)
                .skip(perPage * page)
                .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
                .exec(function (err, users) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(users);
                    }
                });
        })
    },
    putGroup: (groupName: string, groupData: GroupData) => {
        return Groups.findOneAndUpdate({ "groupName": groupName }, groupData);
    },
    removeGroup: async (groupName: string) => {
        try {
            return Groups.deleteMany({ "groupName": groupName });
        } catch (e) {
            return e;
        }
    },
    getMembers: (groupName: string) => {
        return new Promise((resolve, reject) => {
            Groups.findOne({ "groupName": groupName })
                .populate("members")
                .exec((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.members);
                    }
                });
        })
    },
    getMemberIds: (groupName: string) => {
        return new Promise((resolve, reject) => {
            Groups.findOne({ "groupName": groupName })
                .select("members")
                .exec((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        })
    },
    getApplicants: (groupName: string) => {
        return new Promise((resolve, reject) => {
            Groups.findOne({ "groupName": groupName })
                .populate("applicants")
                .exec((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.applicants);
                    }
                });
        })
    },
    addMember: (groupName: string, userName: string) => {
        return usersModels.findByUserName(userName)
            .then((user) => {
                return Groups.updateOne({ "groupName": groupName }, { $push: { "members": user._id } });
            })
            .catch((err) => {
                return err
            })
    },
    removeMember: (groupName: string, userName: string) => {
        return usersModels.findByUserName(userName)
            .then((user) => {
                return Groups.updateOne({ "groupName": groupName }, { $pop: { "members": user._id } });
            })
            .catch((err) => {
                return err
            })
    },
    addApplicant: (groupName: string, userName: string) => {
        console.log(groupName)
        return usersModels.findByUserName(userName)
            .then((user) => {
                return Groups.updateOne({ "groupName": groupName }, { $push: { "applicants": user._id } });
            })
            .cathc((err) => {
                return err
            })
    },
    removeApplicant(groupName: string, userName: string) {
        return usersModels.findByUserName(userName)
            .then((user) => {
                return Groups.updateOne({ "groupName": groupName }, { $pop: { "applicants": user._id } });
            })
            .catch((err) => {
                return err
            })
    }    
}