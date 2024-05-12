"use client";

import React, { FC } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LucIcon,
} from "@ui/index";

import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { columns, Payment } from "./table/accountColumns";
import { DataTable } from "./table/AccountDataTable";

interface AccountSection1Props {}

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

export const AccountSection1: FC<AccountSection1Props> = () => {
  const { onOpen } = useNewAccount();
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Accounts Page</CardTitle>
          <Button onClick={onOpen} size={"sm"}>
            <LucIcon iconName="Plus" className="mr-2 size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};
