"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox, LucIcon } from "@ui/index";
import { InferResponseType } from "hono";

import { client } from "@/lib/hono";
import AccountActions from "./AccountActions";

export type ResponseType = InferResponseType<
  typeof client.api.accounts.$get,
  200
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="mr-2">Name</span>
          <LucIcon iconName="ArrowUpDown" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AccountActions id={row.original.id} />,
  },
];
