"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  Input,
  Label,
  LucIcon,
} from "@ui/index";
import { cn } from "@ui/lib/utils";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  value: "athlete" | "lead";
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "athlete" | "lead";
  setUserType: React.Dispatch<React.SetStateAction<"athlete" | "lead">>;
};

const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  userType,
  value,
}: Props) => {
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          "w-full cursor-pointer",
          userType === value && "border-orange",
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                "flex justify-center p-3",
                userType === value && "border-orange",
              )}
            >
              <LucIcon
                iconName={value === "athlete" ? "User" : "Users"}
                className={cn(
                  userType === value ? "text-orange" : "text-gray-400",
                  "h-6 w-6",
                )}
              />
            </Card>
            <div className="">
              <CardDescription className="text-iridium">
                {title}
              </CardDescription>
              <CardDescription className="text-gray-400">
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "h-4 w-4 rounded-full",
                userType == value ? "bg-orange" : "bg-transparent",
              )}
            >
              <Input
                {...register("type", {
                  onChange: (event) => setUserType(event.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
