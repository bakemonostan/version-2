"use client";
import React from "react";
import HeaderComponent from "../../_components/HeaderComponent";
import OverViewContentCard from "./OverViewContentCard";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import { getDashboardData } from "@/services/dashboard";
import ErrorState from "../../_components/ErrorState";
import OverviewSkeleton from "../../_components/skeletons/OverviewSkeleton";
import { ArrowUpRight } from "lucide-react";
      import { dashboardCardContent, DashboardData } from "@/contents/data";

export default function OverviewContent() {
  const { data, isLoading, error } = useCustomQuery<DashboardData>(
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

  // Helper function to format value based on key
  const formatValue = (key: string, value: number): string => {
    const item = [...dashboardCardContent.trips, ...dashboardCardContent.activity]
      .find(item => item.key === key);
      
    if (item?.isMonetary) {
      return `$${value.toFixed(2)}`;
    }
    
    return value.toString();
  };

  return (
    <div className="h-full relative">
      <HeaderComponent title={`Welcome ${data.details.legal_name!}`} />
      <div className="pb-20">
        <div className="flex flex-col">
          {/* trips */}
          <div className="pb-12 pt-8">
            <p className="uppercase font-extrabold text-black/80 pb-2">Trips</p>
            <div className="grid grid-cols-3 gap-4">
              {dashboardCardContent.trips.map((card, index) => (
                <OverViewContentCard 
                  key={index}
                  title={card.title}
                  value={formatValue(card.key, data[card.key as keyof DashboardData] as number)}
                />
              ))}
            </div>
          </div>
          {/* activity */}
          <div>
            <p className="uppercase font-extrabold text-black/80 pb-2">
              Activity
            </p>
            <div className="grid grid-cols-3 gap-4">
              {dashboardCardContent.activity.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <OverViewContentCard
                    key={index}
                    title={card.title}
                    value={formatValue(card.key, data[card.key as keyof DashboardData] as number)}
                    withIcon
                    isCentered
                    icon={IconComponent && <IconComponent />}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* gradient cta card */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative rounded-lg p-[1px] w-[351.5px] h-[155px] bg-gradient-to-r  from-[#AD75E2] to-[#FFCB4E]">
          <div className="bg-white rounded-[calc(.675rem-1px)] h-full p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="body-1 font-extrabold text-black/80 flex items-center justify-between pb-4">
                  Got a vehicle to rent?
                  <span>
                    <ArrowUpRight className="h-6 w-6 text-gray-800" />
                  </span>
                </h2>
                <p className="body-3 font-normal text-black/60">
                  Join our community of vehicle owners and share your adventure
                  with others. Join our community of vehicle owners and share
                  your adventure with others
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
