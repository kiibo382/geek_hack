import validator from "validator";
import mongoose from "../config/mongoose.js";

const Schema = mongoose.Schema;

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

const Staff = mongoose.model("Staff", staffSchema);

export default Staff