import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import UserTypeCard from "./UserTypeCard";

type Props = {
  register: UseFormRegister<FieldValues>;
};

const TypeSelectionForm = ({ register }: Props) => {
  return (
    <>
      <h2 className=" text-gravel font-bold  md:text-4xl">Create an account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <UserTypeCard
        register={register}
        value="athlete"
        title="Im an athlete"
        text="Looking to connect with other athletes and coaches."
      />
      <UserTypeCard
        register={register}
        value="lead"
        title="I lead an athlete group"
        text="Setting up my circle for the athletes."
      />
    </>
  );
};

export default TypeSelectionForm;
