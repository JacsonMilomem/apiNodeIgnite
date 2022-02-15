import { CarsRepositoryInMemory } from "@module/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarspecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarspecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a nom-existent car", async () => {
    expect(async () => {
      const car_id = "123";
      const specification_id = ["54321"];

      await createCarspecificationUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification  to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car2",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });
    const specification_id = ["54321"];

    await createCarspecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });
  });
});
