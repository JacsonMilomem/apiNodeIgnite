"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create category controlle", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await connection.query(`insert into users(id, name, email, password, "isadmin", created_at, driver_license) 
      values('${id}','admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
      `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body; // console.log(responseToken.body);

    const reposnse = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category SuperTest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(reposnse.status).toBe(201);
  });
  it("Should not to be able to create a new category it name exists ", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body; // console.log(responseToken.body);

    const reposnse = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category SuperTest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(reposnse.status).toBe(400);
  });
});