"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@ui/index";
import { useForm } from "react-hook-form";

import { onCompleteUserRegistration } from "../api/authAction";
import { UserRegistrationProps, UserRegistrationSchema } from "../auth.schema";

export const useSignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "lead",
    },
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      toast.error(error.errors[0].longMessage);
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== "complete") {
          return { message: "Something went wrong!" };
        }

        if (completeSignUp.status == "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration({
            firstname: values.firstName,
            lastname: values.lastName,
            clerkId: signUp.createdUserId,
            type: values.type,
          });

          if (registered) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            setLoading(false);
            router.push("/dashboard");
          }

          if (!registered) {
            toast.error("Something went wrong!");
            // toast.error("");
            // toast({
            //   title: "Error",
            //   description: "Something went wrong!",
            // });
          }
        }
      } catch (error: any) {
        toast.error(error.errors[0].longMessage);
        // toast({
        //   title: "Error",
        //   description: error.errors[0].longMessage,
        // });
      }
    },
  );
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};
