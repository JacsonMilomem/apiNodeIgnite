"use strict";

var _UsersRepositoryInMemory = require("@module/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("@module/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/dateprovider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dateProvider;
describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokenRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able authenticate a new user", async () => {
    const user = {
      driver_license: "123456789",
      email: "user@teste.com",
      password: "1234",
      name: "jacson"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "falso@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect!"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "123456789",
      email: "user1@teste.com",
      password: "1234",
      name: "jacson"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "123"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect!"));
  });
});