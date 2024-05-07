import { migrate } from "drizzle-orm/postgres-js/migrator";

import { connection, db } from "@/db";
import config from "@/drizzle.config";


async function main() {
  console.log(" env Variables -> ", process.env);

  if (process.env.DB_MIGRATION !== "Y") {
    throw new Error('You must set DB_MIGRATION to "Y" when running migrations');
  }

  await migrate(db, { migrationsFolder: config.out! });

  await connection.end();
}

main();
