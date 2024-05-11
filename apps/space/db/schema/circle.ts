import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { categoryEnum, planEnum } from "./enum";

export const circle = pgTable("circle", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  decs: text("description"),
  imageUrl: text("image_url"),
  category: categoryEnum("category").notNull(),
  plan: planEnum("plan").notNull(),
  state: text("state"),
  city: text("city"),
});

export type CircleType = typeof circle.$inferSelect;
