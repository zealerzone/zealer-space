"use client";

import React, { FC } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LucIcon,
  Skeleton,
} from "@ui/index";

import { useBulkDeleteAccounts } from "../api/useBulkDeleteAccounts";
import { useGetAccounts } from "../api/useGetAccounts";
import { useNewAccountZus } from "../hooks/useNewAccountZus";
import { columns } from "./table/accountColumns";
import { DataTable } from "./table/AccountDataTable";

interface AccountsPageSectionProps {}

export const AccountsPageSection: FC<AccountsPageSectionProps> = () => {
  const { onOpen } = useNewAccountZus();
  const accountsQuery = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();

  const disabled = accountsQuery.isLoading || deleteAccounts.isPending;
  const accounts = accountsQuery.data || [];

  if (accountsQuery.isLoading) {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="flex h-[500px] w-full items-center justify-center">
          <LucIcon
            iconName="LoaderCircle"
            className="size-6 animate-spin text-slate-300"
          />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="line-clamp-1  text-xl">Accounts Page</CardTitle>
        <Button onClick={onOpen} size={"sm"}>
          <LucIcon iconName="Plus" className="mr-2 size-4" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          filterKey={"name"}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteAccounts.mutate({ ids });
          }}
          disabled={disabled}
          columns={columns}
          data={accounts}
        />
      </CardContent>
    </Card>
  );
};
