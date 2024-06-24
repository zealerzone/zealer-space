import React from "react";
import { cn } from "@ui/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { USER_REGISTRATION_FORM } from "@/constants/forms";
import FormGenerator from "./FormGenerator";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailsForm({ errors, register }: Props) {
  const groupedFields = USER_REGISTRATION_FORM.reduce((acc, field) => {
    const group = field.group || field.id;
    if (!acc.get(group)) {
      acc.set(group, []);
    }
    acc.get(group)?.push(field);
    return acc;
  }, new Map<string, Array<(typeof USER_REGISTRATION_FORM)[0]>>());

  return (
    <>
      <h2 className="text-gravel font-bold md:text-4xl">Account details</h2>
      <p className="text-iridium md:text-sm">Enter your email and password</p>
      {Array.from(groupedFields.keys()).map((group) => (
        <div
          key={group}
          className={cn(group === "name" && " flex justify-between")}
        >
          {groupedFields
            .get(group)
            ?.map((field) => (
              <FormGenerator
                key={field.id}
                {...field}
                errors={errors}
                register={register}
                name={field.name}
              />
            ))}
        </div>
      ))}
    </>
  );
}

export default AccountDetailsForm;
