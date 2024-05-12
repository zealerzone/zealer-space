"use client";

import { Button } from "@ui/index";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";

export default function Home() {
  const { data: accounts, isLoading } = useGetAccounts();
  const { onOpen } = useNewAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={onOpen}>open</Button>

      <div>{accounts?.map((a) => <p key={a.id}>{a.name}</p>)}</div>
    </main>
  );
}
