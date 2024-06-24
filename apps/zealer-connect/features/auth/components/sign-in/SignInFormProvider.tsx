"use client";

import React from "react";
import { FormProvider } from "react-hook-form";

import { Loader } from "@/components/common/Loader";
import { useSignInForm } from "../../_hooks/useSignInForm";

type Props = {
  children: React.ReactNode;
};

const SignInFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignInForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit} className="h-full">
        <div className="flex h-full flex-col justify-between gap-3">
          <Loader loading={loading}>{children}</Loader>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignInFormProvider;
