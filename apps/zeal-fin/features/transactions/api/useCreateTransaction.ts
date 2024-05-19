import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction Created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO invalidate summary
    },
    onError: () => {
      toast.success("Failed to create transaction");
    },
  });

  return mutation;
};
