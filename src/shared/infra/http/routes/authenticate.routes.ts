import { Router } from "express";

import { AuthenticationUserController } from "@module/accounts/useCases/authenticateUser/AuthenticateUsercontroller";
import { RefreshTokenController } from "@module/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const autenticateUserController = new AuthenticationUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", autenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
