"use client";
import React from "react";
import HeaderComponent from "../../_components/HeaderComponent";
import OverViewContentCard from "./OverViewContentCard";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import { getDashboardData } from "@/services/dashboard";
import ErrorState from "../../_components/ErrorState";
import OverviewSkeleton from "../../_components/skeletons/OverviewSkeleton";

export default function OverviewContent() {
  const { data, isLoading, error } = useCustomQuery(
    ["dashboard data"],
    getDashboardData
  );

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  if (!data) return null;

  return (
    <div>
      <HeaderComponent title={`Welcome ${data.details.legal_name!}`} />
      {/* trips */}
      <div className="pb-12 pt-8">
        <p className="uppercase font-extrabold text-black/80 pb-2">Trips</p>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <OverViewContentCard key={index} />
          ))}
        </div>
      </div>
      {/* activity */}
      <div>
        <p className="uppercase font-extrabold text-black/80 pb-2">Activity</p>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <OverViewContentCard
              withIcon
              isCentered
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
