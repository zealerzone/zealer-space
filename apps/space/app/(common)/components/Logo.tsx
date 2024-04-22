import { FC, memo } from "react";
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
    <Link href={"/"} className={cn("flex items-center", className)}>
      <Image
        className=" mx-4 cursor-pointer rounded"
        src={"/logo.png"}
        alt="logo"
        quality={100}
        width={width}
        height={height}
        priority
      />
    </Link>
  );
};

export default memo(Logo);
