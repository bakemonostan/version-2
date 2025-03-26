import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";

export default function MyAccountPage() {
  return <DashboardShell card={<OverviewSideCard />}>hello</DashboardShell>;
}
