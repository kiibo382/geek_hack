"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator2 = _interopRequireDefault(require("validator"));

var _mongoose = _interopRequireDefault(require("../config/mongoose.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const staffSchema = new Schema({
  staffName: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: v => _validator2.default.isEmail(v),
      message: props => "".concat(props.value, " is invalid email address")
    }
  },
  password: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    default: 1
  }
});

const Staff = _mongoose.default.model("Staff", staffSchema);

var _default = Staff;
exports.default = _default;