import mongoose, { Schema } from "mongoose";
import validator from "validator";

const carrerSchema: Schema = new Schema({
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

const educationalBackgroundSchema = new Schema({
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

const userSchema = new Schema({
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
      validator: (v: string) => validator.isEmail(v),
      message: (props) => `${props.value} is invalid email address`,
    },
  },
  groupEmail: {
    type: String,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
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
  carrer: [carrerSchema],
  educationalBackground: [educationalBackgroundSchema],
});

export interface Carrer {
  groupname: String
  firstDate: String
  lastDate: String
  occupation: String
  contents: String
}

export interface EducationalBackground {
  schoolname: String
  firstDate: String
  lastDate: String
  faculty: String
  department: String
  major: String
  achivement: String
}

export interface UserData {
  _id: String
  userName: String
  firstName: String
  lastName: String
  email: String
  groupEmail: String
  profile: String
  age: Number
  occupation: String
  carrer: Carrer[]
  educationalBackground: EducationalBackground[]
}

export const User = mongoose.model("Users", userSchema);

export default {
  findByEmail: (email: string) => {
    return User.find({ "email": email });
  },
  findByUserName: (userName: string) => {
    return new Promise((resolve, reject) => {
      User.findOne({ "userName": userName })
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
  },
  createUser: (userData: UserData) => {
    const user = new User(userData);
    return user.save();
  },
  userList: (perPage: number, page: number) => {
    return new Promise((resolve, reject) => {
      User.find()
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
  },
  putUser: (userName: string, userData: UserData) => {
    return User.findOneAndUpdate({ "userName": userName }, userData);
  },
  removeUser: async (userName: string) => {
    try {
      return User.deleteMany({ "userName": userName });
    } catch (e) {
      return e;
    }
  }
}