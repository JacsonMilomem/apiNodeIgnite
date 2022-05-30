"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _CreateCarController = require("@module/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("@module/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvailableCarsController = require("@module/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _UploadCarImagesController = require("@module/cars/useCases/uploadCarImage/UploadCarImagesController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureauthenticated = require("../middlewares/ensureauthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarcontroller = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationControlle = new _CreateCarSpecificationController.CreateCarSpecificationControlle();
const uploadCarImagesController = new _UploadCarImagesController.UploadCarImagesController();
const upload = (0, _multer.default)(_upload.default);
carsRoutes.post("/", _ensureauthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarcontroller.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id", _ensureauthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationControlle.handle);
carsRoutes.post("/images/:id", _ensureauthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array("images"), uploadCarImagesController.handle);