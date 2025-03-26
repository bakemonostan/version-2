"use client";
import React, { use } from "react";
import DashboardShell from "../../_components/DashboardShell";
import HeaderComponent from "../../_components/HeaderComponent";
import { getsingleListing } from "@/services/dashboard";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import ImageCarousel from "../../_components/ImageCarousel";
import ListingInfo from "../_components/ListingInfo";
import { VehicleListingDetailsData } from "@/types/dashboard";
import ListingRates from "../_components/ListingRates";
import ListingStatusBar from "../_components/ListingStatusBar";
import ListingsSideCard from "../_components/ListingsSideCard";

interface ListDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ListDetailsPage({ params }: ListDetailsPageProps) {
  const { id } = use(params);
  const { data } = useCustomQuery(
    ["getsingleListing", id as string],
    () => getsingleListing(id as string),
    {
      enabled: !!id,
    }
  );
  console.log(data?.images.map((image) => image.image));
  return (
    <DashboardShell card={<ListingsSideCard listingId={id as string} data={data as VehicleListingDetailsData} />}>
      <ImageCarousel images={data?.images.map((image) => image.image) || []} />
      <div className="pt-8">
        <HeaderComponent title={data?.title} />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="body-2 text-black/80">{data?.make}</p>
            <div className="w-[1px] bg-black/10 h-full rounded-full" />
            <p className="body-2 text-black/80">{data?.model}</p>
            <div className="w-[1px] bg-black/10 h-full rounded-full" />
            <p className="body-2 text-black/80">{data?.year}</p>
          </div>
        </div>
        <ListingInfo data={data as VehicleListingDetailsData} />
        <ListingStatusBar data={data as VehicleListingDetailsData} />
        <ListingRates data={data as VehicleListingDetailsData} />
      </div>
    </DashboardShell>
  );
}
