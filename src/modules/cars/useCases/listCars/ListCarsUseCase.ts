import { Car } from "@module/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@module/cars/repositories/ICarRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}
class ListCarsUseCase {
  constructor(private carsRepository: ICarRepository) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      category_id,
      brand,
      name
    );

    return cars;
  }
}

export { ListCarsUseCase };
