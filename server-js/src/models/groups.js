import mongoose from "../config/mongoose.js";

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
    email: {
        type: String,
        unique: true
    },
    password: String,
    urls: [urlsSchema],
    profile: String,
    staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    staffApplicant: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    ambassador: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    ambassadorApplicant: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

const Groups = mongoose.model("Groups", groupsSchema);

export default Groups