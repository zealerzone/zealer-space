import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { circle } from "./circle";
import { categoryEnum, roleEnum, statusEnum } from "./enum";

// Define Table

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    fullName: text("full_name"),
    phone: text("phone"),
    avatarUrl: text("avatar_url"),
    role: roleEnum("role").default("USER").notNull(),
    bio: text("bio"),
    activity: categoryEnum("activity").notNull().default("OTHER"),
    dob: date("dob", { mode: "string" }),
    verifyStatus: statusEnum("verify_status").default("NOT VERIFIED").notNull(),
    addressLine1: text("address_line1"),
    addressLine2: text("address_line2"),
    zipCode: integer("zip_code"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    facebookUrl: text("facebook_url"),
    xUrl: text("x_url"),
    instaUrl: text("insta_url"),
    youtubeUrl: text("youtube_url"),
    stravaUrl: text("strava_url"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      usernameIdx: index("username_idx").on(table.username),
      email: index("email_idx").on(table.email),
    };
  },
);

export const userCircle = pgTable(
  "user_circle",
  {
    userId: integer("user_id")
      .references(() => user.id)
      .notNull(),
    circleId: integer("circle_id")
      .references(() => circle.id)
      .notNull(),
    isAdmin: boolean("is_admin").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: uniqueIndex("userId_idx").on(table.userId),
      circleIdIdx: uniqueIndex("circleId_idx").on(table.circleId),
    };
  },
);

export type UserType = typeof user.$inferSelect;
// export default { user, userCircle };
