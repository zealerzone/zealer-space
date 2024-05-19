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

import { useBulkDeleteTransactions } from "../api/useBulkDeleteTransactions";
import { useGetTransactions } from "../api/useGetTransactions";
import { useNewTransactionZus } from "../hooks/useNewTransactionZus";
import { columns } from "./table/TransactionColumns";
import { DataTable } from "./table/TransactionDataTable";

interface TransactionsPageSectionProps {}

export const TransactionsPageSection: FC<TransactionsPageSectionProps> = () => {
  const { onOpen } = useNewTransactionZus();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();

  const disabled = transactionsQuery.isLoading || deleteTransactions.isPending;
  const accounts = transactionsQuery.data || [];

  if (transactionsQuery.isLoading) {
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
        <CardTitle className="line-clamp-1  text-xl">
          Transaction History
        </CardTitle>
        <Button onClick={onOpen} size={"sm"}>
          <LucIcon iconName="Plus" className="mr-2 size-4" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          filterKey={"category"}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteTransactions.mutate({ ids });
          }}
          disabled={disabled}
          columns={columns}
          data={accounts}
        />
      </CardContent>
    </Card>
  );
};
