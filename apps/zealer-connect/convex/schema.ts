import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    imageid: v.string(),
    price: v.float64(),
    title: v.string(),
  }),
});
