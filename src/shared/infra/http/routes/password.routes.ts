import { Router } from "express";

import { ResetPasswoerUserController } from "@module/accounts/useCases/resetPasswordUser/ResetPasswoerUserController";
import { SendForgotPasswordMailController } from "@module/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswoerUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
