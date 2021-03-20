import validator from "validator";
import mongoose from "../config/mongoose.js";
const Schema = mongoose.Schema;

const carrersSchema = new Schema({
  groupname: {
    type: String,
    required: true,
  },
  firstDate: {
    type: Date,
    required: true,
  },
  lastDate: Date,
  occupation: String,
  contents: String,
});

const educationalBackgroundsSchema = new Schema({
  schoolname: {
    type: String,
    required: true,
  },
  firstDate: {
    type: Date,
    required: true,
  },
  lastDate: Date,
  faculty: String,
  department: String,
  major: String,
  achivement: String,
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
  groupEmail: {
    type: String,
    unique: true,
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
  occupation: String,
  carrer: [carrersSchema],
  educationalBackground: [educationalBackgroundsSchema],
});

const Users = mongoose.model("Users", usersSchema);

export function findByEmail(email) {
  return Users.find({ "email": email });
}

export function findByUserName(userName) {
  return new Promise((resolve, reject) => {
    Users.findOne({ "userName": userName })
      .select(
        "userName firstName lastName email groupEmail profile age occupation carrer educationalBackground"
      )
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
  })
    .then((result) => {
      return result
    })
    .catch(() => {
      return null
    })
}

export function createUser(userData) {
  const user = new Users(userData);
  return user.save();
}

export function userList(perPage, page) {
  return new Promise((resolve, reject) => {
    Users.find()
      .limit(perPage)
      .skip(perPage * page)
      .select("userName firstName lastName email groupEmail profile age occupation carrer educationalBackground")
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  })
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