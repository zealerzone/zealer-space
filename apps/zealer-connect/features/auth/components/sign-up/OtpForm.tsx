import React from "react";

import OTPInput from "./OtpInput";

type Props = {};

const OTPForm = ({}: Props) => {
  return (
    <>
      <h2 className="text-gravel font-bold md:text-4xl">Enter OTP</h2>
      <p className="text-iridium md:text-sm">
        Enter the one time password that was sent to your email.
      </p>
      <div className="flex w-full justify-center py-5">
        <OTPInput />
      </div>
    </>
  );
};

export default OTPForm;
