import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    user_id,
    refresh_token,
    expire_date,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
