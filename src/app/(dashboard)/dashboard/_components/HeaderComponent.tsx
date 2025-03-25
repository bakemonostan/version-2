import React from "react";
import Goback from "./Goback";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  goback?: boolean;
  title: string;
  subtitle?: string;
}

export default function HeaderComponent({
  goback = false,
  title = "Title",
  subtitle = "Welcome to your dashboard",
  ...rest
}: HeaderProps) {
  return (
    <div {...rest}>
      {goback && <Goback />}
      <p className="heading-l pb-3 text-black/80 capitalize">{title}</p>
      <p className="body-2 text-black/80">{subtitle}</p>
    </div>
  );
}
