import mongoose from "../config/mongoose.js";
import { findByUserName } from "./users.js"

const Schema = mongoose.Schema;

const urlsSchema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
})

const groupsSchema = new Schema({
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

const Groups = mongoose.model("Groups", groupsSchema);

export function findByGroupName(groupName) {
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
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            return result
        })
        .catch(() => {
            return null
        })
}

export function createGroup(groupData) {
    const group = new Groups(groupData);
    return group.save();
}

export function groupList(perPage, page) {
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
}

export function putGroup(groupName, groupData) {
    return Groups.findOneAndUpdate({ "groupName": groupName }, groupData);
}

export async function removeGroup(groupName) {
    try {
        return Groups.deleteMany({ "groupName": groupName });
    } catch (e) {
        return e;
    }
}

export function getMembers(groupName) {
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
}

export function getMemberIds(groupName) {
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
}

export function getApplicants(groupName) {
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
}

export function addMember(groupName, userName) {
    return findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $push: { "members": user._id } });
        })
        .catch((err) => {
            return err
        })
}

export function removeMember(groupName, userName) {
    return findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $pop: { "members": user._id } });
        })
        .catch((err) => {
            return err
        })
}

export function addApplicant(groupName, userName) {
    console.log(groupName)
    return findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $push: { "applicants": user._id } });
        })
        .cathc((err) => {
            return err
        })
}

export function removeApplicant(groupName, userName) {
    return findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $pop: { "applicants": user._id } });
        })
        .catch((err) => {
            return err
        })
}