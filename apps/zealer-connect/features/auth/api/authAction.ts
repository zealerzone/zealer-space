"use server";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  typeof client.api.users.registerUser.$post
>;
export type UserRegisterRequestType = InferRequestType<
  typeof client.api.users.registerUser.$post
>["json"];

export const onCompleteUserRegistration = async (
  values: UserRegisterRequestType,
): Promise<ResponseType | null> => {
  console.log("Servervales ->", values);
  let res = null;
  try {
    const registered = await client.api.users.registerUser.$post({
      json: values,
    });

    res = await registered.json();
  } catch (error) {
    console.log("[authAction | onCompleteUserRegistration | Error]->", error);
  }

  return res;
};
