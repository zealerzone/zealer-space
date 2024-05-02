import { FC } from "react";
import Link from "next/link";
import { LucIcon } from "@ui/index";

interface SocialProps {
  containerStyle: string;
  iconStyle: string;
}

const icons = [
  {
    path: "/",
    name: "Youtube",
  },
  {
    path: "/articles",
    name: "Instagram",
  },
  {
    path: "/events",
    name: "Ffacebook",
  },
];

const Social: FC<SocialProps> = ({ containerStyle, iconStyle }) => {
  return (
    <div className={`${containerStyle}`}>
      {icons.map((icon) => {
        return (
          <Link href={icon.path} key={icon.path}>
            <LucIcon iconName={icon.name as any} />
            <div className={`${iconStyle}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
