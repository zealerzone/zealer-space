import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { USER_REGISTRATION_FORM } from "@/constants/forms";
import FormGenerator from "./FormGenerator";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailsForm({ errors, register }: Props) {
  return (
    <>
      <h2 className="text-gravel font-bold md:text-4xl">Account details</h2>
      <p className="text-iridium md:text-sm">Enter your email and password</p>
      {USER_REGISTRATION_FORM.map((field) => (
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
}

export default AccountDetailsForm;
