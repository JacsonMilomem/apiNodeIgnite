"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRenatalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRenatalController {
  async handle(request, response) {
    const {
      expected_return_date,
      car_id
    } = request.body;
    const {
      id
    } = request.user;

    const createRentalUseCase = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_return_date
    });
    return response.status(200).json(rental);
  }

}

exports.CreateRenatalController = CreateRenatalController;