import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@module/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@module/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@module/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureauthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
