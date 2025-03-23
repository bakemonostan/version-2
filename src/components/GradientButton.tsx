import React from "react";
import { useIsMutating } from "@tanstack/react-query";

interface GradientButtonProps extends React.ComponentProps<"button"> {
  onClick?: () => void;
  isActive?: boolean;
  title?: string;
  innerBg?: string;
}

export default function GradientButton({
  onClick,
  isActive = true,
  title,
  innerBg,
  ...props
}: GradientButtonProps) {
  const isMutating = useIsMutating();
  return (
    <button
      onClick={onClick}
      data-state={isActive ? "active" : "inactive"}
      disabled={isMutating > 0}
      className={`gradient-border cursor-pointer disabled:cursor-not-allowed  ${
        isMutating ? "opacity-50" : ""
      }`}
      {...props}
    >
      <span
        className="gradient-border-inner bg-background px-6 py-2 flex-center"
        style={{ background: innerBg }}
      >
        {title}
      </span>
    </button>
  );
}
