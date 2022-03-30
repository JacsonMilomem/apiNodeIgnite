import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@module/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@module/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expire_date,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = this.repository.create({
      user_id,
      refresh_token,
      expire_date,
    });

    await this.repository.save(userTokens);

    return userTokens;
  }
}

export { UsersTokensRepository };
