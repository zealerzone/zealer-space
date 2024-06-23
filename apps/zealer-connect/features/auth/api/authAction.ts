"use server";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  typeof client.api.users.onCompleteUserRegistration.$post
>;
type RequestType = InferRequestType<
  typeof client.api.users.onCompleteUserRegistration.$post
>["json"];

export const onCompleteUserRegistration = async (
  values: RequestType,
): Promise<ResponseType> => {
  const registered = await client.api.users.onCompleteUserRegistration.$post({
    json: values,
  });

  return await registered.json();
};
