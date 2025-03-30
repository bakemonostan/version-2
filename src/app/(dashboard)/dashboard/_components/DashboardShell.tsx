"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isBookingDetailsPage = pathname.includes("bookings/");
  return (
    <>
      <div
        className={cn(
          `border w-full ${
            isBookingDetailsPage ? "col-span-9" : "col-span-8"
          } min-h-[745px] p-5 rounded-xl bg-white`,
          className
        )}
        {...rest}>
        {children}
      </div>
      <div
        className={cn(
          "w-full col-span-4 sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto",
          isBookingDetailsPage ? "col-span-3" : "col-span-4"
        )}>
        {card}
      </div>
    </>
  );
}
