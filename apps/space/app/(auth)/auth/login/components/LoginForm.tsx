"use client";

import { FC, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@ui/index";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/app/(auth)/action";
import AuthCardWrapper from "@/app/(auth)/components/AuthCardWrapper";

interface LoginFormProps {}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "password is required.",
  }),
});

const LoginForm: FC<LoginFormProps> = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [ispending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      await login(data);
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Welcome Back Zealer"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={ispending}
                    placeholder="Email"
                    {...field}
                    className="h-10"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={ispending}
                    placeholder="Password"
                    {...field}
                    className="h-10"
                  />
                </FormControl>
                <Button
                  disabled={ispending}
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                  <Link href="/auth/reset">Forgot password?</Link>
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          {message && (
            <div className="text-destructive text-sm font-medium">
              {message}
            </div>
          )}
          <Button type="submit" disabled={ispending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default LoginForm;
