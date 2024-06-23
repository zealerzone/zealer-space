import RegistrationFormStep from "@/features/auth/components/RegistrationFormStep";
import SignUpFormProvider from "@/features/auth/components/SignUpFormProvider";

const SignUp = () => {
  return (
    <div className="  w-full flex-1 py-36 md:px-16 ">
      <div className="flex h-full flex-col gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3 ">
            <RegistrationFormStep />
            {/* <ButtonHandler /> */}
          </div>
          {/* <HighLightBar /> */}
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
