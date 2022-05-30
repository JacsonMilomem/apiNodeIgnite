"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _Auth = _interopRequireDefault(require("@config/Auth"));

var _AppError = require("@shared/errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { UsersRepository } from "@module/accounts/infra/typeorm/repositories/UsersRepository";
// import { UsersTokensRepository } from "@module/accounts/infra/typeorm/repositories/UsersTokensRepository";
async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization; // const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new _AppError.AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _Auth.default.secret_token); // const userRepository = new UsersRepository();
    // const user = await userRepository.findById(user_id);
    // const user = await userTokenRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token
    // );
    // if (!user) {
    //   throw new AppError("User does not exists", 401);
    // }

    request.user = {
      id: user_id
    };
    next();
  } catch (error) {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}