import { Router } from "express";

import { AuthenticationUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUsercontroller";

const authenticateRoutes = Router();

const autenticateUserController = new AuthenticationUserController();

authenticateRoutes.post("/sessions", autenticateUserController.handle);

export { authenticateRoutes };
