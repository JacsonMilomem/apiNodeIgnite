"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("@module/rentals/useCases/createRentals/CreateRentalController");

var _DevolutionRentalController = require("@module/rentals/useCases/devolutionRentals/DevolutionRentalController");

var _ListRentalsByUserController = require("@module/rentals/useCases/listRentalsByUser/ListRentalsByUserController");

var _ensureauthenticated = require("../middlewares/ensureauthenticated");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRenatalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalRoutes.post("/", _ensureauthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureauthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureauthenticated.ensureAuthenticated, listRentalsByUserController.handle);