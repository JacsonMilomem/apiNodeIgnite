"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswoerUserController = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordUserUseCase = require("./ResetPasswordUserUseCase");

class ResetPasswoerUserController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    const resetPasswordUserUseCase = _tsyringe.container.resolve(_ResetPasswordUserUseCase.ResetPasswordUserUseCase);

    await resetPasswordUserUseCase.execute({
      token: String(token),
      password
    });
    return response.send();
  }

}

exports.ResetPasswoerUserController = ResetPasswoerUserController;