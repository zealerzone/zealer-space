"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@ui/index";
import { useForm } from "react-hook-form";

import {
  onCompleteUserRegistration,
  UserRegisterRequestType,
} from "../api/authAction";
import { UserRegistrationProps, UserRegistrationSchema } from "../auth.schema";
import { useAuthStepZus } from "./use-auth-step-zus";

// export const onCompleteUserRegistration1 = async (
//   fullname: string,
//   clerkId: string,
//   type: string
// ) => {
//   try {
//     const registered = await client.user.create({
//       data: {
//         fullname,
//         clerkId,
//         type,
//         subscription: {
//           create: {},
//         },
//       },
//       select: {
//         fullname: true,
//         id: true,
//         type: true,
//       },
//     })

//     if (registered) {
//       return { status: 200, user: registered }
//     }
//   } catch (error) {
//     return { status: 400 }
//   }
// }

export const useSignUpForm = () => {
  const { setCurrentStep, currentStep } = useAuthStepZus();
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

  const onGenerateOTP = async (email: string, password: string) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setCurrentStep(currentStep + 1);
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

          const req: UserRegisterRequestType = {
            clerkId: signUp.createdUserId,
            firstname: values.firstName,
            lastname: values.lastName,
            type: values.type,
          };

          const registered = await onCompleteUserRegistration(req);

          if (registered) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            setLoading(false);
            router.push("/athlete");
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
