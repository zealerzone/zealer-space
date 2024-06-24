import React from "react";
import { InputOTP, InputOTPSlot } from "@ui/index";

import { useAuthStepZus } from "../../_hooks/use-auth-step-zus";

type Props = {};

const OTPInput = ({}: Props) => {
  const { otp, setOtp } = useAuthStepZus();
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
      <div className="flex gap-3">
        <div>
          <InputOTPSlot index={0} />
        </div>
        <div>
          <InputOTPSlot index={1} />
        </div>
        <div>
          <InputOTPSlot index={2} />
        </div>
        <div>
          <InputOTPSlot index={3} />
        </div>
        <div>
          <InputOTPSlot index={4} />
        </div>
        <div>
          <InputOTPSlot index={5} />
        </div>
      </div>
    </InputOTP>
  );
};

export default OTPInput;
