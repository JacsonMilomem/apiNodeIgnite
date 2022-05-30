"use strict";

var _CarsRepositoryInMemory = require("@module/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("@module/cars/repositories/in-memory/SpecificationRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarspecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarspecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  /* it("should not be able to add a new specification to a nom-existent car", async () => {
    const car_id = "123";
    const specification_id = ["54321"];
     await expect(
      await createCarspecificationUseCase.execute({
        car_id,
        specification_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  }); */

  it("should be able to add a new specification  to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car2",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "teste",
      description: "teste"
    });
    const specification_id = [specification.id];
    const specificationsCars = await createCarspecificationUseCase.execute({
      car_id: car.id,
      specification_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});