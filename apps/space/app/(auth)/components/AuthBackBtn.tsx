import { FC } from "react";
import Link from "next/link";
import { Button } from "@ui/index";

interface AuthBackBtnProps {
  href: string;
  label: string;
}

const AuthBackBtn: FC<AuthBackBtnProps> = ({ href, label }) => {
  return (
    <Button variant={"link"} size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default AuthBackBtn;
