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

const staffSchema = new Schema({
    staffName: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: (props) => `${props.value} is invalid email address`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    permissionLevel: {
        type: Number,
        default: 1,
    },
});

const groupsSchema = new Schema({
    groupName: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    urls: [urlsSchema],
    profile: String,
    staff: [staffSchema],
    ambassador: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

const Groups = mongoose.model("Groups", groupsSchema);

export function findByGroupName(groupName) {
    Groups.findOne({ "groupName": groupName })
        .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
}

export function createGroup(groupData) {
    const group = new Groups(groupData);
    return group.save();
}

export function groupList(perPage, page) {
    Groups.find()
        .limit(perPage)
        .skip(perPage * page)
        .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
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
    Groups.findOne({ "groupName": groupName })
        .populate("members")
}

export function getMemberIds(groupName) {
    Groups.findOne({ "groupName": groupName })
        .select("members")
}

export function getApplicants(groupName) {
    Groups.findOne({ "groupName": groupName })
        .populate("applicants")
}

export function addMember(groupName, userName) {
    findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $push: { "members": user._id } });
        })
        .catch((err) => {
            return err
        })
}

export function removeMember(groupName, userName) {
    findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $pop: { "members": user._id } });
        })
        .catch((err) => {
            return err
        })
}

export function addApplicant(groupName, userName) {
    console.log(groupName)
    findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $push: { "applicants": user._id } });
        })
        .cathc((err) => {
            return err
        })
}

export function removeApplicant(groupName, userName) {
    findByUserName(userName)
        .then((user) => {
            return Groups.updateOne({ "groupName": groupName }, { $pop: { "applicants": user._id } });
        })
        .catch((err) => {
            return err
        })
}