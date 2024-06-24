"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { USER_LOGIN_FORM } from "@/constants/forms";
import FormGenerator from "../sign-up/FormGenerator";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2 className="text-gravel font-bold md:text-4xl">Login</h2>
      <p className="text-iridium md:text-sm">
        You will receive a one time password
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
