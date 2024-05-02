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
        <ReactIcon iconName="FaGoogle" className="h-5 w-5" />
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        // onClick={() => onClick("github")}
      >
        App
        {/* <ReactIcon iconName="faApple" className="h-5 w-5" /> */}
      </Button>
    </div>
  );
};

export default SocialLogin;
