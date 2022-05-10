import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@module/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationControlle } from "@module/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@module/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@module/cars/useCases/uploadCarImage/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationControlle = new CreateCarSpecificationControlle();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarcontroller.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationControlle.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
