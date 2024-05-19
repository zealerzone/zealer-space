import { FC } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  LucIcon,
} from "@ui/index";

import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount";
import { useOpenAccountZus } from "@/features/accounts/hooks/useOpenAccountZus";
import { useConfirm } from "@/hooks/useConfirm";

interface TransactionActionsProps {
  id: string;
}

const TransactionActions: FC<TransactionActionsProps> = ({ id }) => {
  const { onOpen } = useOpenAccountZus();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account.",
  );

  const deleteMutation = useDeleteAccount(id);

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          //   onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <LucIcon iconName="Ellipsis" className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <LucIcon iconName="SquarePen" className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <LucIcon iconName="Trash2" className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TransactionActions;
