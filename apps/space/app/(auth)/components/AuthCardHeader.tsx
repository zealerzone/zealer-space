import { FC } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@ui/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
interface AuthHeaderProps {
  label: string;
}

const AuthCardHeader: FC<AuthHeaderProps> = ({ label }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("h3", font.className)}>🔐 Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default AuthCardHeader;
