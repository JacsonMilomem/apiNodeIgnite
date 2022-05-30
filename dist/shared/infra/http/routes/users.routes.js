"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateUsercontroller = require("@module/accounts/useCases/createUser/CreateUsercontroller");

var _ProfileUserController = require("@module/accounts/useCases/profileUser/ProfileUserController");

var _UpdateUserAvatarController = require("@module/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureauthenticated = require("../middlewares/ensureauthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUsercontroller.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", _ensureauthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", _ensureauthenticated.ensureAuthenticated, profileUserController.handle);