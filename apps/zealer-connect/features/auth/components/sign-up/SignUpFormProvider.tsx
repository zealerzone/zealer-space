"use client";

import { FC } from "react";
import { FormProvider } from "react-hook-form";

import { Loader } from "@/components/common/Loader";
import { useSignUpForm } from "../../_hooks/useSignUpForm";

interface SignUpFormProviderProps {
  children: React.ReactNode;
}

const SignUpFormProvider: FC<SignUpFormProviderProps> = ({ children }) => {
  const { loading, methods, onHandleSubmit } = useSignUpForm();
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

export default SignUpFormProvider;
