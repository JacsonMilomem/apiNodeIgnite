import { Router } from "express";

import { CreateCarController } from "@module/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationControlle } from "@module/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@module/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationControlle = new CreateCarSpecificationControlle();

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

export { carsRoutes };
