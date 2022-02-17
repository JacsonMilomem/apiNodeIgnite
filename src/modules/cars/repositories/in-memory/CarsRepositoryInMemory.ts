import { ICreateCarDTO } from "@module/cars/dtos/ICreateCarDTO";
import { Car } from "@module/cars/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarRepository";

class CarsRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
    return cars;
  }

  async findById(car_id: any): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }
}

export { CarsRepositoryInMemory };
