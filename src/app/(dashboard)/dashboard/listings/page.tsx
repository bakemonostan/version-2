"use client";

import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/listingsTableColums";
import { useQuery } from "@tanstack/react-query";
import { getUserListingTableData } from "@/services/dashboard";

export default function ListingsPage() {
  const { data: TableData, isLoading } = useQuery({
    queryKey: ['Vehicle listing table data'],
    queryFn: getUserListingTableData,
  });

  return (
    <DashboardShell card={<OverviewSideCard />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Vehicle Listings</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={TableData || []}
          />
        )}
      </div>
    </DashboardShell>
  );
}
