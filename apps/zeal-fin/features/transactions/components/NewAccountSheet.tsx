import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/index";

import { useCreateAccount } from "../api/useCreateTransaction";
import { useNewAccountZus } from "../hooks/useNewAccountZus";
import AccountForm, { FormAccountValues } from "./AccountForm";

interface NewAccountSheetProps {}

const NewAccountSheet: FC<NewAccountSheetProps> = ({}) => {
  const { isOpen, onClose } = useNewAccountZus();
  const { mutate, isPending } = useCreateAccount();

  const onSubmit = (values: FormAccountValues) => {
    console.log("Values=->", values);
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
