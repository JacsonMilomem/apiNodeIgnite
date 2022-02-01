import { Router } from "express";

import { CreateSpecificationController } from "@module/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
