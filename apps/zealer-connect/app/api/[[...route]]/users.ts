import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { Hono } from "hono";

import { db } from "@/db";
import { inserUserSchema, users } from "@/db/schema";

//  This is called to register the user with Clerk
const app = new Hono().post(
  "/onCompleteUserRegistration",
  clerkMiddleware(),
  zValidator(
    "json",
    inserUserSchema.pick({
      firstname: true,
      lastname: true,
      clerkId: true,
      type: true,
    }),
  ),
  async (c) => {
    const auth = getAuth(c);

    const values = c.req.valid("json");
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const registered = await db
      .insert(users)
      .values({
        id: createId(),
        ...values,
      })
      .returning();
    console.log("Registered ->>", registered);

    if (registered) {
      return c.json({ registered });
    }

    return c.json({ error: "Not registered" }, 400);
  },
);

export default app;
