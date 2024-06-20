"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

export default function Home() {
  const products = useQuery(api.products.get);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {products?.map((p) => <p> {p.title}</p>)}
    </main>
  );
}
