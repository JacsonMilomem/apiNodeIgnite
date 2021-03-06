"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("@module/cars/infra/typeorm/entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(category_id, brand, name) {
    console.log(name);
    const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(car_id) {
    const car = await this.repository.findOne(car_id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;