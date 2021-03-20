import validator from "validator";
import mongoose from "../config/mongoose.js";
const Schema = mongoose.Schema;

const snsSchema = new Schema({
  snsName: {
    type: String,
    required: true,
  },
  snsUrl: {
    type: String,
    required: true
  },
  followers: Number,
});

const usersSchema = new Schema({
  userName: {
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
  profile: String,
  age: Number,
  gender: String,
  sns: [snsSchema],
});

const Users = mongoose.model("Users", usersSchema);

export function findByEmail(email) {
  return Users.find({ "email": email });
}

export function findByUserName(userName) {
  return Users.findOne({ "userName": userName })
    .select(
      "userName firstName lastName email profile age gender sns"
    )
}

export function createUser(userData) {
  const user = new Users(userData);
  return user.save();
}

export function userList(perPage, page) {
  return Users.find()
    .limit(perPage)
    .skip(perPage * page)
    .select("userName firstName lastName email profile age gender sns")
}

export function putUser(userName, userData) {
  return Users.findOneAndUpdate({ "userName": userName }, userData);
}

export async function removeUser(userName) {
  try {
    return Users.deleteMany({ "userName": userName });
  } catch (e) {
    return e;
  }
}

export default Users