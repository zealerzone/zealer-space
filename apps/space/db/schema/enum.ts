import { pgEnum } from "drizzle-orm/pg-core";

// Define the enum
export const roleEnum = pgEnum("role", ["USER", "ATHLETE"]);
export const statusEnum = pgEnum("verify_status", [
  "NOT VERIFIED",
  "PENDING",
  "VERIFIED",
  "REJECTED",
]);

export const planEnum = pgEnum("plan", ["FREE", "PRO"]);
export const categoryEnum = pgEnum("category", [
  "RUNNING",
  "TREKKING",
  "GYM",
  "TRAVEL",
  "OTHER",
]);
