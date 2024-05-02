import { FC, memo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/index";

import AuthBackBtn from "./AuthBackBtn";
import AuthCardHeader from "./AuthCardHeader";
import SocialLogin from "./SocialLogin";

interface AuthCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const AuthCardWrapper: FC<AuthCardWrapperProps> = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocial,
}) => {
  const MemoSocialLogin = memo(SocialLogin);
  const MemoAuthBackBtn = memo(AuthBackBtn);
  const MemoAuthCardHeader = memo(AuthCardHeader);
  return (
    <Card className="z-20 min-w-[450px] shadow-md ">
      <CardHeader>
        <MemoAuthCardHeader label={headerLabel} />
      </CardHeader>
      <CardContent>
        <div>{children}</div>
      </CardContent>
      {showSocial && (
        <CardFooter>
          <MemoSocialLogin />
        </CardFooter>
      )}
      <CardFooter className="flex items-center justify-center">
        <MemoAuthBackBtn label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default AuthCardWrapper;
