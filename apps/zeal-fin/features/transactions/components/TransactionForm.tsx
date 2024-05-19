"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomCurrency from "@ui/components/ui/custom/custom-currency";
import CustomDatePicker from "@ui/components/ui/custom/custom-date-picker";
import {
  Button,
  CustomSelect,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LucIcon,
  Textarea,
} from "@ui/index";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertTransactionsSchema } from "@/db/schema";
import { convertAmountToMilliUnits } from "@/lib/appUtils";

export const formTransactionSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiFormTransactionSchema = insertTransactionsSchema.omit({
  id: true,
});
export type FormTransactionValues = z.infer<typeof formTransactionSchema>;
export type ApiFormTransactionValues = z.infer<typeof apiFormTransactionSchema>;

interface TransactionFormProps {
  id?: string;
  defaultValues?: FormTransactionValues;
  onSubmit: (values: ApiFormTransactionValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  categoryOptions: { label: string; value: string }[];
  accountOptions: { label: string; value: string }[];
  onCreateCategory: (name: string) => void;
  onCreateAccount: (name: string) => void;
}

const TransactionForm: FC<TransactionFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  disabled,
  onDelete,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}) => {
  const form = useForm({
    resolver: zodResolver(formTransactionSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormTransactionValues) => {
    const amount = parseFloat(values.amount);

    const amountInMilliUnits = convertAmountToMilliUnits(amount);

    onSubmit({
      ...values,
      amount: amountInMilliUnits,
    });
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-y-8 pt-4"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomDatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <CustomSelect
                  disabled={disabled}
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CustomSelect
                  disabled={disabled}
                  placeholder="Select a category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  disabled={disabled}
                  placeholder="Add a payee"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <CustomCurrency
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Optional notes"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2 w-full">
          {id ? "Save Changes" : "Create Transaction"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="mt-2 flex w-full gap-2"
            variant={"outline"}
          >
            <LucIcon iconName="Trash" className="size-4" />
            <span>Delete transaction</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TransactionForm;
