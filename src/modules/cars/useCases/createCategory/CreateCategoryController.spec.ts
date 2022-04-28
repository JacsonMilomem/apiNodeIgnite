import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controlle", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `insert into users(id, name, email, password, "isadmin", created_at, driver_license) 
      values('${id}','admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    // console.log(responseToken.body);

    const reposnse = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(reposnse.status).toBe(201);
  });

  it("Should not to be able to create a new category it name exists ", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    // console.log(responseToken.body);

    const reposnse = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(reposnse.status).toBe(400);
  });
});
