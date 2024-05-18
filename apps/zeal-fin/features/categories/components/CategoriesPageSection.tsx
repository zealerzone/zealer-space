"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LucIcon,
  Skeleton,
} from "@ui/index";

import { useBulkDeleteCategories } from "../api/useBulkDeleteCategories";
import { useGetCategories } from "../api/useGetCategories";
import { useNewCategoryZus } from "../hooks/useNewCategoryZus";
import { columns } from "./table/CategoryColumns";
import { DataTable } from "./table/CategoryDataTable";

const CategoriesPageSection = () => {
  const { onOpen } = useNewCategoryZus();
  const categoriesQuery = useGetCategories();
  const deletecategories = useBulkDeleteCategories();

  const disabled = categoriesQuery.isLoading || deletecategories.isPending;
  const categories = categoriesQuery.data || [];

  if (categoriesQuery.isLoading) {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="flex h-[500px] w-full items-center justify-center">
          <LucIcon
            iconName="LoaderCircle"
            className="size-6 animate-spin text-slate-300"
          />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="line-clamp-1  text-xl">Categories Page</CardTitle>
        <Button onClick={onOpen} size={"sm"}>
          <LucIcon iconName="Plus" className="mr-2 size-4" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          filterKey={"name"}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deletecategories.mutate({ ids });
          }}
          disabled={disabled}
          columns={columns}
          data={categories}
        />
      </CardContent>
    </Card>
  );
};

export default CategoriesPageSection;
