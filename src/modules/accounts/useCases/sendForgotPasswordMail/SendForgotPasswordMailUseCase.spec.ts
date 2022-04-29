import { UsersRepositoryInMemory } from "@module/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@module/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailprovider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send for got mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "354678",
      email: "teste@teste.com",
      name: "jacson",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("teste@teste.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user dows not esists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("jlt@getNameOfJSDocTypedef.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create a users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokenRepositoryInMemory,
      "create"
    );

    usersRepositoryInMemory.create({
      driver_license: "4678",
      email: "teste@tesdddte.com",
      name: "jacson_1",
      password: "1235",
    });

    await sendForgotPasswordMailUseCase.execute("teste@tesdddte.com");
    expect(generateTokenMail).toBeCalled();
  });
});
