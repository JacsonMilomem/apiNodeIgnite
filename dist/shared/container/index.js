"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _UsersRepository = require("@module/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("@module/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarsImagesRepository = require("@module/cars/infra/typeorm/repositories/CarsImagesRepository");

var _CarsRepository = require("@module/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("@module/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("@module/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalsRepository = require("@module/rentals/infra/typeorm/Repositories/RentalsRepository");

_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);