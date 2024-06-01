import { FC } from "react";
import {
  LucIcon,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/index";

import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { FormAccountValues } from "@/features/accounts/components/AccountForm";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { useGetTransactionById } from "../api/useGetTransactionById";
import { useOpenTransactionZus } from "../hooks/useOpenTransactionZus";
import TransactionForm, {
  ApiFormTransactionValues,
  FormTransactionValues,
} from "./TransactionForm";

interface EditTransactionSheetProps {}

const EditTransactionSheet: FC<EditTransactionSheetProps> = ({}) => {
  const { isOpen, onClose, id } = useOpenTransactionZus();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction",
  );

  const transactionIduery = useGetTransactionById(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  //  Accounts
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading =
    transactionIduery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const transactionDefaultValues = transactionIduery?.data
    ? {
        accountId: transactionIduery.data.accountId,
        categoryId: transactionIduery.data.categoryId,
        amount: transactionIduery.data.amount.toString(),
        date: transactionIduery.data.date
          ? new Date(transactionIduery.data.date)
          : new Date(),
        payee: transactionIduery.data.payee,
        notes: transactionIduery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const onSubmit = (values: ApiFormTransactionValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing Transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LucIcon
                iconName="LoaderCircle"
                className="text-muted-foreground size-4 animate-spin"
              />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={transactionDefaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateCategory={onCreateCategory}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
