import React from "react";
import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  card: React.ReactNode;
}

export default function DashboardShell({
  children,
  className,
  card,
  ...rest
}: DashboardShellProps) {
  return (
    <>
      <div
        className={cn(
          "border w-full col-span-9 overflow-scroll min-h-[745px] p-4 rounded-xl hide-scrollbar bg-white",
          className
        )}
        {...rest}>
        {children}
      </div>
      <div className="w-full col-span-3">{card}</div>
    </>
  );
}
