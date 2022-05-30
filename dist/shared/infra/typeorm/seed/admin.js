"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _index.default)("localhost");
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)("admin", 8);
  await connection.query(`insert into users(id, name, email, password, "isadmin", created_at, driver_license) 
    values('${id}','admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);
  await connection.close;
}

create().then(() => {
  console.log("User Admin");
});