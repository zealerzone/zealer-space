import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { categoryEnum, planEnum } from "./enum";

export const circle = pgTable("circle", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  decs: text("description"),
  imageUrl: text("image_url"),
  category: categoryEnum("category").notNull().default("OTHER"),
  plan: planEnum("plan").notNull().default("FREE"),
  state: text("state"),
  city: text("city"),
});

export type UserType = typeof circle.$inferSelect;
