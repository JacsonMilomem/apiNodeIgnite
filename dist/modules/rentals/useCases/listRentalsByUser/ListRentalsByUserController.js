"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsByUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const listRentalsByUseCase = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);

    const rentals = await listRentalsByUseCase.execute(id);
    return response.json(rentals);
  }

}

exports.ListRentalsByUserController = ListRentalsByUserController;