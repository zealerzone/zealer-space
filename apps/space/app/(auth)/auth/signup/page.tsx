import Image from "next/image";
import Link from "next/link";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@zealer/ui";

import { signup } from "../../action";

export default async function SignUp() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form>
              <div className="grid gap-4">
                {/* <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Max" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Robinson" required />
                  </div>
                </div> */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input name="password" type="password" />
                </div>
                <Button formAction={signup} className="w-full">
                  Create an account
                </Button>
              </div>
            </form>
            {/* <form> */}
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
            {/* </form> */}
            <div className=" text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="bg-muted hidden lg:block">
        <Image
          src="/logo.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
