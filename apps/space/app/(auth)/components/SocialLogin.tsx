import { FC } from "react";
import { Button, ReactIcon } from "@ui/index";

interface SocialLoginProps {}

const SocialLogin: FC<SocialLoginProps> = () => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        variant={"outline"}
        className="w-full"
        // onClick={() => onClick("google")}
      >
        <ReactIcon.FaGoogle />
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        // onClick={() => onClick("github")}
      >
        Apple
        <ReactIcon.FaApple />
      </Button>
    </div>
  );
};

export default SocialLogin;
