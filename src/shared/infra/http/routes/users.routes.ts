import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@module/accounts/useCases/createUser/CreateUsercontroller";
import { ProfileUserController } from "@module/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserAvatarController } from "@module/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
