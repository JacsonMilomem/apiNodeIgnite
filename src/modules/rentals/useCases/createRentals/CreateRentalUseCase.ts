import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@module/cars/repositories/ICarRepository";
import { Rental } from "@module/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@module/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is Unavalible");
    }

    const user = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (user) {
      throw new AppError("There's a rental ins progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
