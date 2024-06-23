import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@ui/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: FC<LogoProps> = ({ className, height = 36, width = 36 }) => {
  return (
    <Image
      className={cn("rounded", className)}
      src={"/logo.svg"}
      alt="logo"
      width={width}
      height={height}
    />
  );
};

export default Logo;
