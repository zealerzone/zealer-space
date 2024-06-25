import ButtonHandler from "@/features/auth/components/sign-up/ButtonHandler";
import HighLightBar from "@/features/auth/components/sign-up/HighLightBar";
import RegistrationFormStep from "@/features/auth/components/sign-up/RegistrationFormStep";
import SignUpFormProvider from "@/features/auth/components/sign-up/SignUpFormProvider";

const SignUp = () => {
  return (
    <div className="  flex w-full items-center  justify-center md:px-16 ">
      <div className="flex h-full flex-col gap-3">
        <SignUpFormProvider>
          <HighLightBar />
          <div className="flex flex-col gap-3 ">
            <RegistrationFormStep />
            <ButtonHandler />
          </div>
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
