import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Auth from "@config/Auth";
import { IUsersTokensRepository } from "@module/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, Auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, Auth.secret_refresh_token, {
      subject: sub,
      expiresIn: Auth.expires_in_refresh_token,
    });

    const expire_date = this.dateProvider.addDays(
      Auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      expire_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };