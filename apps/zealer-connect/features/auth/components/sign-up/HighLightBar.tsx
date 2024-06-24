"use client";

import React from "react";
import { cn } from "@ui/lib/utils";

import { useAuthStepZus } from "../../_hooks/use-auth-step-zus";

type Props = {};

const HighLightBar = (props: Props) => {
  const { currentStep } = useAuthStepZus();

  return (
    <div className="mb-10 grid grid-cols-3 gap-3">
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          currentStep == 1 ? "bg-orange" : "bg-platinum",
        )}
      ></div>
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          currentStep == 2 ? "bg-orange" : "bg-platinum",
        )}
      ></div>
      <div
        className={cn(
          "col-span-1 h-2 rounded-full",
          currentStep == 3 ? "bg-orange" : "bg-platinum",
        )}
      ></div>
    </div>
  );
};

export default HighLightBar;
