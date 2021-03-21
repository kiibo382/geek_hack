"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("../config/mongoose.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const urlsSchema = new Schema({
  name: String,
  url: {
    type: String,
    required: true
  }
});
const groupsSchema = new Schema({
  groupName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  urls: [urlsSchema],
  profile: String,
  staff: [{
    type: Schema.Types.ObjectId,
    ref: 'Staff'
  }],
  staffApplicant: [{
    type: Schema.Types.ObjectId,
    ref: 'Staff'
  }],
  ambassador: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  ambassadorApplicant: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }]
});

const Groups = _mongoose.default.model("Groups", groupsSchema);

var _default = Groups;
exports.default = _default;