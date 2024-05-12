import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error("NEXT_PUBLIC_APP_URL is missing");
}

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL);
