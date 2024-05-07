import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";


export const connection = postgres(process.env.DATABASE_URL!, {
  max:process.env.DB_MIGRATION === "Y" ||process.env.DB_SEEDING === "Y" ? 1 : undefined,
  onnotice:process.env.DB_SEEDING === "Y" ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type dbType = typeof db;

export default db;
