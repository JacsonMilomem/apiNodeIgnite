"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswoerUserController = require("@module/accounts/useCases/resetPasswordUser/ResetPasswoerUserController");

var _SendForgotPasswordMailController = require("@module/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswoerUserController.ResetPasswoerUserController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);