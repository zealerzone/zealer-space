import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").unique(),
  type: text("type"),
  firstname: text("firstname"),
  lastname: text("lastname"),
  photo: text("photo"),
  // email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const inserUserSchema = createInsertSchema(users);
