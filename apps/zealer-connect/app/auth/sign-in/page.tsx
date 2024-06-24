import Link from "next/link";
import { Button } from "@ui/index";

import LoginForm from "@/features/auth/components/sign-in/LoginForm";
import SignInFormProvider from "@/features/auth/components/sign-in/SignInFormProvider";

const SignInPage = () => {
  return (
    <div className="w-full flex-1 py-36 md:px-16">
      <div className="flex h-full flex-col gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="flex w-full flex-col items-center gap-3">
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p>
                Don't have an account?{" "}
                <Link href="/auth/sign-up" className="font-bold">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignInPage;
