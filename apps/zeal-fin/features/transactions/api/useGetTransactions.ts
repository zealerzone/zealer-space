import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { convertAmountFromMilliUnits } from "@/lib/appUtils";
import { client } from "@/lib/hono";

export const useGetTransactions = () => {
  const params = useSearchParams();

  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    //  TODO check if params are needed in a key
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const { data } = await response.json();
      return data.map((transaction) => ({
        ...transaction,
        amount: convertAmountFromMilliUnits(transaction.amount),
      }));
    },
  });

  return query;
};
