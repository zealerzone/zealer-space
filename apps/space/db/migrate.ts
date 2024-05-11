import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

require("dotenv").config({ path: ".env.local" });

const pushmigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  const migrationclient = postgres(process.env.DATABASE_URL!, {
    max: 1,
  });
  const migrationdb = drizzle(migrationclient);

  await migrate(migrationdb, {
    migrationsFolder: "./db/migrations",
  });
  await migrationclient.end();
};

pushmigration();
