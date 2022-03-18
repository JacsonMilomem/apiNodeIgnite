import { Router } from "express";

import { CreateRenatalController } from "@module/rentals/useCases/createRentals/CreateRentalController";
import { DevolutionRentalController } from "@module/rentals/useCases/devolutionRentals/DevolutionRentalController";
import { ListRentalsByUserController } from "@module/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRenatalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
