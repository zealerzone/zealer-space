import { getTableName, sql, Table } from "drizzle-orm";

import { connection, db, dbType } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "@/db/seeds";
import { env } from "@/env";

if (env.DB_SEEDING !== "Y") {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: dbType, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

for (const table of [
  //   schema.orderMenuItem,
  //   schema.orderStatus,
  //   schema.order,
  //   schema.address,
  //   schema.user,
  //   schema.menuItem,
  //   schema.category,
  //   schema.statusCatalog,
  //   schema.restaurant,
  //   schema.city,
  //   schema.state,
]) {
  await resetTable(db, table);
}

// await seeds.category(db);
// await seeds.statusCatalog(db);
// await seeds.state(db);
// await seeds.city(db);
// await seeds.restaurant(db);
// await seeds.user(db);
// await seeds.order(db);

await connection.end();
