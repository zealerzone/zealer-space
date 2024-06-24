import { FC } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="bg-secondary fixed left-0 z-[1] flex h-full w-52 flex-col gap-y-4 p-3">
      SideBar
    </aside>
  );
};

export default Sidebar;
