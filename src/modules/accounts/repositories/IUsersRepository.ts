interface ICreateUserDTO {
  nome: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(date: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
