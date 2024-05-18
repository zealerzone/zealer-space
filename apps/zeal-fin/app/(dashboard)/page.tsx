"use client";

import { Button } from "@ui/index";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useNewAccountZus } from "@/features/accounts/hooks/useNewAccountZus";

export default function Home() {
  const { data: accounts, isLoading } = useGetAccounts();
  const { onOpen } = useNewAccountZus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={onOpen}>open</Button>

      <div>{accounts?.map((a) => <p key={a.id}>{a.name}</p>)}</div>
    </main>
  );
}
