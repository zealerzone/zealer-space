import { FC } from "react";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  ReactIcon,
} from "@ui/index";

import LoginButton from "@/app/(common)/components/LoginButton";
import { getUser } from "@/utils/supabase/server";
import UserDropDown from "./UserDropDown";

interface UserNavProps {}

const UserNav: FC<UserNavProps> = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <LoginButton asChild mode="modal">
        <Button size={"sm"}>Login</Button>
      </LoginButton>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Avatar>
            {/* <AvatarImage
              src={user || ""}
              alt={user?.name || "Zealer User"}
            /> */}

            <AvatarFallback>
              <ReactIcon.FaUser size={20} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <UserDropDown user={user} />
    </DropdownMenu>
  );
};

export default UserNav;
