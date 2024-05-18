import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/index";

import { useCreateCategory } from "../api/useCreateCategory";
import { useNewCategoryZus } from "../hooks/useNewCategoryZus";
import { FormCategoryValues } from "./CategoryForm";
import CategoryForm from "./CategoryForm";

interface NewCategorySheetProps {}

const NewCategorySheet: FC<NewCategorySheetProps> = ({}) => {
  const { isOpen, onClose } = useNewCategoryZus();
  const { mutate, isPending } = useCreateCategory();

  const onSubmit = (values: FormCategoryValues) => {
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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category</SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
