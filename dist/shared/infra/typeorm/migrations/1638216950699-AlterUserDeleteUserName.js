"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUserName1638216950699 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUserName1638216950699 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.AlterUserDeleteUserName1638216950699 = AlterUserDeleteUserName1638216950699;