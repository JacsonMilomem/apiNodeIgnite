import { container } from "tsyringe";
import "@shared/container/providers";

import { UsersRepository } from "@module/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@module/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "@module/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@module/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@module/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@module/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarRepository } from "@module/cars/repositories/ICarRepository";
import { ICarsImagesRepository } from "@module/cars/repositories/ICarsImagesRepository";
import { ICategoriesRepository } from "@module/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@module/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@module/rentals/infra/typeorm/Repositories/RentalsRepository";
import { IRentalsRepository } from "@module/rentals/repositories/IRentalsRepository";

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

container.registerSingleton<ICarRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);
