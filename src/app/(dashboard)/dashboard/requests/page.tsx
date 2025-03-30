"use client";

import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";
import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "@/services/dashboard";
import { columns } from "./_components/RequestsTableColumns";
import { DataTable } from "@/components/ui/data-table";
import HeaderComponent from "../_components/HeaderComponent";
export default function RequestsPage() {
  const { data: TableData } = useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequests,
  });

  console.log(TableData);
  return <DashboardShell card={<OverviewSideCard />}>
    <div className="p-4"> 
      <HeaderComponent
        title="Your requests"
        subtitle="Manage your requests"
        withSubtitle
      />
    </div>
        <DataTable
            columns={columns}
            data={TableData || []}
          />
  </DashboardShell>;
}
