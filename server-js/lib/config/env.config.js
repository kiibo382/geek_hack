"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  port: 8080,
  appEndpoint: "http://localhost:3000",
  apiEndpoint: "http://localhost:8080",
  jwt_secret: "sample",
  jwt_staff_secret: "staffSample",
  jwt_expiration_in_seconds: 36000,
  environment: "dev",
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048
  }
};
exports.default = _default;