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

import { insertAccountSchema } from "@/db/schema";

export const formAccountSchema = insertAccountSchema.pick({
  name: true,
});

export type FormAccountValues = z.infer<typeof formAccountSchema>;

interface AccountFormProps {
  id?: string;
  defaultValues?: FormAccountValues;
  onSubmit: (values: FormAccountValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const AccountForm: FC<AccountFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  disabled,
  onDelete,
}) => {
  const form = useForm({
    resolver: zodResolver(formAccountSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormAccountValues) => {
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
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {id ? "Save Changes" : "Create account"}
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
            <span>Delete account</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
