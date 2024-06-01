import { FC } from "react";
import { LucIcon } from "@ui/index";
import { cn } from "@ui/lib/utils";

import { useOpenAccountZus } from "@/features/accounts/hooks/useOpenAccountZus";
import { useOpenCategoryZus } from "@/features/categories/hooks/useOpenCategoryZus";
import { useOpenTransactionZus } from "../../hooks/useOpenTransactionZus";

interface CategoryColumnProps {
  id: string;
  category: string | null;
  categoryId: string | null;
}

const CategoryColumn: FC<CategoryColumnProps> = ({
  category,
  categoryId,
  id,
}) => {
  const { onOpen: onOpenCategory } = useOpenCategoryZus();
  const { onOpen: onOpenTransaction } = useOpenTransactionZus();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center hover:underline",
        !category && "text-rose-500",
      )}
    >
      {!category && (
        <LucIcon iconName="TriangleAlert" className="mr-2 size-4 shrink-0" />
      )}
      {category || "Uncategorized"}
    </div>
  );
};

export default CategoryColumn;
