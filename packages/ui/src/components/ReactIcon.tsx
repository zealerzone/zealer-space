import { memo } from "react";
import * as Icons from "react-icons";

export type ReactIconProps = {
  iconName: string;
  className?: string;
  size?: string;
  color?: string;
};

export const ReactIcon = memo(
  ({ iconName, className, color, size }: ReactIconProps) => {
    const IconComponent: any = iconName;

    if (!IconComponent) {
      return null;
    }

    return (
      <Icons.IconContext.Provider value={{ className, size, color }}>
        <div>
          <IconComponent />
        </div>
      </Icons.IconContext.Provider>
    );
  },
);

ReactIcon.displayName = "ReactIcon";
