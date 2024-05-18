"use client";

import { FC } from "react";
import { useUser } from "@clerk/nextjs";

interface WelcomeMsgProps {}

const WelcomeMsg: FC<WelcomeMsgProps> = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="mb-4 space-y-2">
      <h2 className="h2">
        Welcome Back {isLoaded ? ", " : ""} {user?.firstName} 👋
      </h2>
      <p className="text-sm lg:text-base ">
        This is your Financial Overview Report
      </p>
    </div>
  );
};

export default WelcomeMsg;
