import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LucIcon,
} from "@ui/index";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertCategoriesSchema } from "@/db/schema";

export const formCategorySchema = insertCategoriesSchema.pick({
  name: true,
});

export type FormCategoryValues = z.infer<typeof formCategorySchema>;

interface CategoryFormProps {
  id?: string;
  defaultValues?: FormCategoryValues;
  onSubmit: (values: FormCategoryValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const CategoryForm: FC<CategoryFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  disabled,
  onDelete,
}) => {
  const form = useForm({
    resolver: zodResolver(formCategorySchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormCategoryValues) => {
    onSubmit(values);
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. travel, fuel, etc .."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {id ? "Save Changes" : "Create Category"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="flex w-full gap-2"
            variant={"outline"}
          >
            <LucIcon iconName="Trash" className="size-4" />
            <span>Delete category</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CategoryForm;
