import { migrate } from "drizzle-orm/neon-http/migrator";

import { db } from ".";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./db/migrations" });
  } catch (error) {
    console.log("Error During Migration", error);
    process.exit(1);
  }
};

main();
