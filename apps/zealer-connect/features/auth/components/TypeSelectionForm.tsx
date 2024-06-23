import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import UserTypeCard from "./UserTypeCard";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "athlete" | "lead";
  setUserType: React.Dispatch<React.SetStateAction<"athlete" | "lead">>;
};

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <h2 className=" text-gravel font-bold  md:text-4xl">Create an account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="lead"
        title="I lead an athlete group"
        text="Setting up my circle for the athletes."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="athlete"
        title="Im an athlete"
        text="Looking to connect with other athletes and coaches."
      />
    </>
  );
};

export default TypeSelectionForm;
