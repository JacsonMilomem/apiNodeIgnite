import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@module/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/storegeprovider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StoregeProvider")
    private storegeProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storegeProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
