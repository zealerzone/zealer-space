import { defineConfig } from "drizzle-kit";

// import "dotenv/config";
require("dotenv").config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
