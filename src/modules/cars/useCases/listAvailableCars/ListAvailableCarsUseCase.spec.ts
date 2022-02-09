import { CarsRepositoryInMemory } from "@module/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("list Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to lista all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A1",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "DEF2D34",
      fine_amount: 100,
      brand: "Audi",
      category_id: "0e34ef95-f89c-41b7-8456-c6a722cbb4f5",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able  to list all avaliable cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A1",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "DEF2D34",
      fine_amount: 100,
      brand: "Audi 1",
      category_id: "0e34ef95-f89c-41b7-8456-c6a722cbb4f5",
    });

    const cars = await listCarsUseCase.execute({ brand: "Audi 1" });

    expect(cars).toEqual([car]);
  });

  it("should be able  to list all avaliable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A4",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "DEF2D35",
      fine_amount: 100,
      brand: "Audi 4",
      category_id: "0e34ef95-f89c-41b7-8456-c6a722cbb4f5",
    });

    const cars = await listCarsUseCase.execute({ name: "Audi A4" });

    expect(cars).toEqual([car]);
  });

  it("should be able  to list all avaliable cars by Category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A6",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "DEF2D36",
      fine_amount: 100,
      brand: "Audi 6",
      category_id: "0e34ef95-f89c-41b7-8456-c6a722cbb4f5",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "0e34ef95-f89c-41b7-8456-c6a722cbb4f5",
    });

    expect(cars).toEqual([car]);
  });
});
