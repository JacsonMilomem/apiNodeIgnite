import { Router } from "express";

import { CreateCarController } from "@module/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@module/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarcontroller.handle
);
carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
