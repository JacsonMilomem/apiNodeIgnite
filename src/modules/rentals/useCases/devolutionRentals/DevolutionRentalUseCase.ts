import { delay, inject } from "tsyringe";

import { ICarRepository } from "@module/cars/repositories/ICarRepository";
import { Rental } from "@module/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@module/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(id);
    const minimumDaily = 1;

    if (!rental) {
      throw new AppError("Rental dos not exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, false);

    return rental;
  }
}

export { DevolutionRentalUseCase };
