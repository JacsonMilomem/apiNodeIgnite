"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("@module/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("@module/cars/useCases/importCategory/ImportCategoryController");

var _ListCategoriesController = require("@module/cars/useCases/listCategories/ListCategoriesController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureauthenticated = require("../middlewares/ensureauthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: "./tmp"
});
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const listCategoriesController = new _ListCategoriesController.ListCategoriesController();
categoriesRoutes.post("/", _ensureauthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", upload.single("file"), _ensureauthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, importCategoryController.handle);