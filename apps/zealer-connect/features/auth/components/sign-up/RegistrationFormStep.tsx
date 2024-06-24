"use client";

import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";

import { Spinner } from "@/components/Spinner";
import { useAuthStepZus } from "../../_hooks/use-auth-step-zus";
import TypeSelectionForm from "./TypeSelectionForm";

const DetailForm = dynamic(() => import("./AccountDetailsForm"), {
  ssr: false,
  loading: () => <Spinner />,
});

const OTPForm = dynamic(() => import("./OtpForm"), {
  ssr: false,
  loading: () => <Spinner />,
});

type Props = {};

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep, otp } = useAuthStepZus();

  setValue("otp", otp);

  switch (currentStep) {
    case 1:
      return <TypeSelectionForm register={register} />;
    case 2:
      return <DetailForm errors={errors} register={register} />;
    case 3:
      return <OTPForm />;
  }

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
