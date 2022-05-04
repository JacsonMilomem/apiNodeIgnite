import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import Auth from "@config/Auth";
// import { UsersRepository } from "@module/accounts/infra/typeorm/repositories/UsersRepository";
// import { UsersTokensRepository } from "@module/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  // const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, Auth.secret_token) as IPayload;

    // const userRepository = new UsersRepository();

    // const user = await userRepository.findById(user_id);
    // const user = await userTokenRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token
    // );

    // if (!user) {
    //   throw new AppError("User does not exists", 401);
    // }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
