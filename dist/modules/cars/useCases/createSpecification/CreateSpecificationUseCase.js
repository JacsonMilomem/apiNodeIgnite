"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ISpecificationsRepository = require("@module/cars/repositories/ISpecificationsRepository");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationsRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationsRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationUseCase {
  constructor(specificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  async execute({
    name,
    description
  }) {
    const specificationAlreadyExist = await this.specificationRepository.findByName(name);
    console.log(specificationAlreadyExist);

    if (specificationAlreadyExist) {
      throw new _AppError.AppError("Specification Already Exists!");
    }

    await this.specificationRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateSpecificationUseCase = CreateSpecificationUseCase;