import { FC } from "react";
import {
  LucIcon,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/index";

import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteCategory } from "../api/useDeleteCategory";
import { useEditCategory } from "../api/useEditCategory";
import { useGetCategoryById } from "../api/useGetCategoryById";
import { useOpenCategoryZus } from "../hooks/useOpenCategoryZus";
import CategoryForm, { FormCategoryValues } from "./CategoryForm";

interface EditCategorySheetProps {}

const EditCategorySheet: FC<EditCategorySheetProps> = ({}) => {
  const { isOpen, onClose, id } = useOpenCategoryZus();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category",
  );

  const categoryByIdQuery = useGetCategoryById(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = categoryByIdQuery.isLoading;

  const categoryDefaultValues = categoryByIdQuery?.data
    ? {
        name: categoryByIdQuery.data.name,
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

  const onSubmit = (values: FormCategoryValues) => {
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
            <SheetTitle>Edit category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LucIcon
                iconName="LoaderCircle"
                className="text-muted-foreground size-4 animate-spin"
              />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={categoryDefaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
