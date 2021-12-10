import { container } from "tsyringe";

import { UsersRepository } from "@module/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@module/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@module/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@module/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "@module/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@module/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
