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
          "border w-full col-span-8  min-h-[745px] p-5 rounded-xl bg-white",
          className
        )}
        {...rest}>
        {children}
      </div>
      <div className="w-full col-span-4 sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">{card}</div>
    </>
  );
}
