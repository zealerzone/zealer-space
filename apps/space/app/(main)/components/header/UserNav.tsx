import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  ReactIcon,
} from "@ui/index";

import { logout } from "@/app/(auth)/action";
import LoginButton from "@/app/(common)/components/LoginButton";
import { getUser } from "@/utils/supabase/client";

interface UserNavProps {}

const UserNav: FC<UserNavProps> = ({}) => {
  const user = getUser();
  const router = useRouter();

  if (!user) {
    return (
      <LoginButton asChild mode="modal">
        <Button variant={"secondary"} size={"sm"}>
          Sign In
        </Button>
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
              {/* <Icons.faUser /> */}
              <ReactIcon iconName="faUser" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{"test"}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {"user?.email"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="cursor-pointer">
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/a/dashboard")}
          >
            Dashboard
            <DropdownMenuShortcut className="cursor-pointer">
              ⌘B
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Circle
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
