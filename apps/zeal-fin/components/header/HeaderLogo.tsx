import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderLogoProps {}

const HeaderLogo: FC<HeaderLogoProps> = () => {
  return (
    <Link href={"/"}>
      <div className="hidden items-center lg:flex">
        <Image src={"/logo.svg"} alt="Header Logo" height={20} width={150} />
      </div>
    </Link>
  );
};

export default HeaderLogo;
