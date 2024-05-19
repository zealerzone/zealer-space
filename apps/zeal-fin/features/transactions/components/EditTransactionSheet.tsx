import { FC } from "react";
import {
  LucIcon,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/index";

import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount";
import { useEditAccount } from "@/features/accounts/api/useEditAccount";
import { useGetAccountById } from "@/features/accounts/api/useGetAccountById";
import AccountForm, {
  FormAccountValues,
} from "@/features/accounts/components/AccountForm";
import { useOpenAccountZus } from "@/features/accounts/hooks/useOpenAccountZus";
import { useConfirm } from "@/hooks/useConfirm";

interface EditTransactionSheetProps {}

const EditTransactionSheet: FC<EditTransactionSheetProps> = ({}) => {
  const { isOpen, onClose, id } = useOpenAccountZus();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account",
  );

  const accountByIdQuery = useGetAccountById(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = accountByIdQuery.isLoading;

  const accountDefaultValues = accountByIdQuery?.data
    ? {
        name: accountByIdQuery.data.name,
      }
    : {
        name: "",
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

  const onSubmit = (values: FormAccountValues) => {
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LucIcon
                iconName="LoaderCircle"
                className="text-muted-foreground size-4 animate-spin"
              />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={accountDefaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
