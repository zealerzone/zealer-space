import React from "react";
import { cn } from "@ui/lib/utils";

import { Spinner } from "../Spinner";

type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  return loading ? (
    <div className={cn(className || "flex w-full justify-center py-5")}>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  );
};
