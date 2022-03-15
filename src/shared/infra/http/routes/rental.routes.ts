import { Router } from "express";

import { CreateRenatalController } from "@module/rentals/useCases/createRentals/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRenatalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
