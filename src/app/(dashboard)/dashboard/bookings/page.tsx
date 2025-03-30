"use client";

import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";
import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "@/services/dashboard";
import { columns } from "./_components/BookingsTableColumns";
import { DataTable } from "@/components/ui/data-table";
import HeaderComponent from "../_components/HeaderComponent";
export default function BookingsPage() {
  const { data: TableData } = useQuery({
    queryKey: ['bookings'],
    queryFn: getAllBookings,
  });
  return <DashboardShell card={<OverviewSideCard />}>
    <div className="p-4">
      <HeaderComponent
        title="Your bookings"
        subtitle="Manage your bookings"
        withSubtitle
      />
    </div>
    <DataTable
            columns={columns}
            data={TableData || []}
          />
  </DashboardShell>;
}
