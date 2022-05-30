"use strict";

var _CarsRepositoryInMemory = require("@module/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUsecase;
let carsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUsecase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUsecase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exists license plate", async () => {
    await createCarUsecase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    });
    await expect(createCarUsecase.execute({
      name: "name car2",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    })).rejects.toEqual(new _AppError.AppError("Car Already exist"));
  });
  it("should not be able to create a car with available true by default ", async () => {
    const car = await createCarUsecase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    });
    expect(car.available).toBe(true);
  });
});