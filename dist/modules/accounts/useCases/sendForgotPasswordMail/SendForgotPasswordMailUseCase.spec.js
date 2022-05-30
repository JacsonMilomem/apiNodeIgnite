"use strict";

var _UsersRepositoryInMemory = require("@module/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("@module/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/dateprovider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/mailprovider/inMemory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokenRepositoryInMemory;
let mailProviderInMemory;
describe("Send for got mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokenRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokenRepositoryInMemory();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "354678",
      email: "teste@teste.com",
      name: "jacson",
      password: "12345"
    });
    await sendForgotPasswordMailUseCase.execute("teste@teste.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user dows not esists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("jlt@getNameOfJSDocTypedef.com")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("Should be able to create a users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokenRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "4678",
      email: "teste@tesdddte.com",
      name: "jacson_1",
      password: "1235"
    });
    await sendForgotPasswordMailUseCase.execute("teste@tesdddte.com");
    expect(generateTokenMail).toBeCalled();
  });
});