"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@ui/index";
import { useFormContext } from "react-hook-form";

import { useAuthStepZus } from "../../_hooks/use-auth-step-zus";
import { useSignUpForm } from "../../_hooks/useSignUpForm";

type Props = {};

const ButtonHandler = (props: Props) => {
  const { setCurrentStep, currentStep } = useAuthStepZus();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState("firstName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  if (currentStep === 3) {
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <p>
          Already have an account?
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <Button
          type="submit"
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGenerateOTP(getValues("email"), getValues("password")),
            })}
        >
          Continue
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Button
        type="submit"
        className="w-full"
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        Continue
      </Button>
      <p>
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
