import { inject, injectable } from "tsyringe";

import { Car } from "@module/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@module/cars/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadExiste = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadExiste) {
      throw new AppError("Car Already exist");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
