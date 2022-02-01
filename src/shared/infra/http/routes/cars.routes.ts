import { Router } from "express";

import { CreateCarController } from "@module/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarcontroller.handle
);

export { carsRoutes };
