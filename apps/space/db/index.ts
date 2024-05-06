import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";
import { env } from "@/env";

export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATION === "Y" || env.DB_SEEDING === "Y" ? 1 : undefined,
  onnotice: env.DB_SEEDING === "Y" ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type dbType = typeof db;

export default db;
