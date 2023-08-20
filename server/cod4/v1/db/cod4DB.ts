import { Kysely, MysqlDialect } from "kysely";
import { DB } from "./schema";
import { createPool } from "mysql2";

require("dotenv").config();
const databaseString = process.env.COD4_DATABASE_URL as string;
const dialect = new MysqlDialect({
  pool: createPool(databaseString),
});

export const cod4DB = new Kysely<DB>({
  dialect,
});
