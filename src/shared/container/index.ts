import { container } from "tsyringe";

import { UsersRepository } from "@module/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@module/accounts/repositories/IUsersRepository";
import { CarRepository } from "@module/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@module/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@module/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarRepository } from "@module/cars/repositories/ICarRepository";
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

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
