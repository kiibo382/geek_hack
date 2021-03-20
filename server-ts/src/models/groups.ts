import mongoose, { Schema, Document } from "mongoose";
import usersModels, { UserData } from "./users"


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

export interface GroupData extends Document {
    groupName: String
    emailDomain: String
    password: String
    urls: [Urls]
    intern: Boolean
    newCareer: Boolean
    midCareer: Boolean
    industry: String
    profile: String
    members: [Schema.Types.ObjectId]
    applicants: [Schema.Types.ObjectId]
};

export interface GroupDataWithMembersAndApplicants extends Document {
    groupName: String
    emailDomain: String
    password: String
    urls: [Urls]
    intern: Boolean
    newCareer: Boolean
    midCareer: Boolean
    industry: String
    profile: String
    members: UserData[]
    applicants: UserData[]
};

export const Groups = mongoose.model("Groups", groupsSchema)


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
                .exec((err, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        })
    },
    getMemberIds: (groupName: string) => {
        return Groups.findOne({ "groupName": groupName })
            .select("members")
    },
    getApplicants: (groupName: string) => {
        return new Promise((resolve, reject) => {
            Groups.findOne({ "groupName": groupName })
                .populate("applicants")
                .exec((err, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        })
    },
    addMember: async (groupName: string, userName: string) => {
        try {
            const user = await usersModels.findByUserName(userName);
            return await Groups.updateOne({ "groupName": groupName }, { $push: { "members": user._id } });
        } catch (err) {
            return err;
        }
    },
    removeMember: async (groupName: string, userName: string) => {
        try {
            const user = await usersModels.findByUserName(userName);
            return await Groups.updateOne({ "groupName": groupName }, { $pop: { "members": user._id } });
        } catch (err) {
            return err;
        }
    },
    addApplicant: async (groupName: string, userName: string) => {
        console.log(groupName)
        try {
            const user = await usersModels.findByUserName(userName);
            return await Groups.updateOne({ "groupName": groupName }, { $push: { "applicants": user._id } });
        } catch (err) {
            return err;
        }
    },
    removeApplicant: async (groupName: string, userName: string) => {
        try {
            const user = await usersModels.findByUserName(userName);
            return await Groups.updateOne({ "groupName": groupName }, { $pop: { "applicants": user._id } });
        } catch (err) {
            return err;
        }
    }
}