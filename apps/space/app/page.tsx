import Link from "next/link";

import { Button } from "@zealer/ui";

export default function Page(): JSX.Element {
  return (
    <main className="flex h-screen items-center justify-center">
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Welcome to Zealer Space
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Unleash your inner adventurer, share your tales, and find
              inspiration in the footsteps of others.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <div className="flex justify-center">
              <Button type="button">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Subscribe for more information and updates.
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
