"use strict";

var _CategoriesRepositoryInMemory = require("@module/cars/repositories/in-memory/CategoriesRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let createCategoryRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    createCategoryRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(createCategoryRepositoryInMemory);
  });
  it("should be able to  create a new category", async () => {
    const category = {
      name: "Category Teste",
      description: "Category Description teste"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await createCategoryRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("should not be able to  create a new category with name exists", async () => {
    const category = {
      name: "Category Teste",
      description: "Category Description teste"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category Already Exists!"));
  });
});