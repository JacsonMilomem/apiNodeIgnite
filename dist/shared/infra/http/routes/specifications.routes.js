"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("@module/cars/useCases/createSpecification/CreateSpecificationController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureauthenticated = require("../middlewares/ensureauthenticated");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationsRoutes.post("/", _ensureauthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);