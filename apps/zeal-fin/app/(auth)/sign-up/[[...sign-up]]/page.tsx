import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { LucIcon } from "@ui/index";

export default function SignUpPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex-col items-center justify-center px-4 lg:flex">
        <div className="space-y-4 pt-16 text-center">
          <h1 className="h1">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Log in or Create account to get back to your dashboard
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <LucIcon
              iconName="Loader"
              className="text-muted-foreground animate-spin"
            />
          </ClerkLoading>
        </div>
      </div>
      <div className="bg-secondary hidden h-full items-center justify-center lg:flex">
        <Image src="/logo.svg" alt="logo" height={500} width={500} />
      </div>
    </div>
  );
}
