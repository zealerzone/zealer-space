import { FC } from "react";

import CircleSwitcher from "./CircleSwitcher";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="flex  max-h-16 items-center justify-between border-b px-5 py-2">
      <CircleSwitcher />
    </div>
  );
};

export default Header;
