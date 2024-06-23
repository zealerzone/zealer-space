import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import Logo from "@/components/common/Logo";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  // const { userId } = auth();

  // if (userId) redirect("/");

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="ld:w-full flex w-[600px] flex-col items-start p-6">
        <Image
          src="/logo.svg"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "20%",
            height: "auto",
          }}
          width={0}
          height={0}
        />
        {children}
      </div>
      <div className="max-w-4000px relative hidden max-h-full w-full flex-1 flex-col gap-3  overflow-hidden pl-24 pt-10 lg:flex">
        <h2 className=" font-bold md:text-4xl">Welcome to Zealer Connect</h2>
        <p className=" mb-10 md:text-sm">
          Unleash your inner adventurer, share your tales, and find inspiration
          in the footsteps of others.
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute top-48 !w-[1600px] shrink-0"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default MainLayout;
