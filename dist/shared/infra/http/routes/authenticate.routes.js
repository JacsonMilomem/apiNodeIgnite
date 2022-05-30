"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;

var _express = require("express");

var _AuthenticateUsercontroller = require("@module/accounts/useCases/authenticateUser/AuthenticateUsercontroller");

var _RefreshTokenController = require("@module/accounts/useCases/refreshToken/RefreshTokenController");

const authenticateRoutes = (0, _express.Router)();
exports.authenticateRoutes = authenticateRoutes;
const autenticateUserController = new _AuthenticateUsercontroller.AuthenticationUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticateRoutes.post("/sessions", autenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);