"use client";

import React, { FC, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LucIcon,
  Skeleton,
  toast,
} from "@ui/index";

import { transactions as transactionSchema } from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/useSelectAccount";
import { useBulkCreateTransactions } from "../api/useBulkCreateTransactions";
import { useBulkDeleteTransactions } from "../api/useBulkDeleteTransactions";
import { useGetTransactions } from "../api/useGetTransactions";
import { useNewTransactionZus } from "../hooks/useNewTransactionZus";
import ImportCard from "./ImportCard";
import { columns } from "./table/TransactionColumns";
import { DataTable } from "./table/TransactionDataTable";
import UploadButton from "./table/UploadButton";

interface TransactionsPageSectionProps {}

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export const TransactionsPageSection: FC<TransactionsPageSectionProps> = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const [AccountDialog, confirm] = useSelectAccount();
  const { onOpen } = useNewTransactionZus();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const bulkCreateMutation = useBulkCreateTransactions();

  const disabled = transactionsQuery.isLoading || deleteTransactions.isPending;
  const accounts = transactionsQuery.data || [];

  const onUplaod = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log(results.data);

    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };
  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };
  const onSubmitImport = async (
    values: (typeof transactionSchema.$inferInsert)[],
  ) => {
    const accountId = await confirm();

    if (!accountId) toast.error("Please select an account to continue");

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      }
    });
  };

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
  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="line-clamp-1  text-xl">
          Transaction History
        </CardTitle>
        <div className="flex items-center gap-x-2">
          <Button onClick={onOpen} size={"sm"}>
            <LucIcon iconName="Plus" className="mr-2 size-4" />
            Add new
          </Button>
          <UploadButton onUpload={onUplaod} />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          filterKey={"payee"}
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
