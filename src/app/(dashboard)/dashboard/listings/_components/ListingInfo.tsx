import StatusBadge from "@/components/StatusBadge";
import { VehicleListingDetailsData } from "@/types/dashboard";
import React from "react";

export default function ListingInfo({
  data,
}: {
  data: VehicleListingDetailsData;
}) {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-3 gap-5 w-3/4 mx-auto">
        <div className="flex gap-5">
          <p className="body-2 text-black/80">Status</p>
          <StatusBadge status={data?.status} />
        </div>
        <div className="flex gap-2 border-x border-black/10 justify-center">
          <p className="body-2 text-black/80">Upcoming Booking</p>
          <p className="body-2 text-black/80">{data?.upcoming_booking}</p>
        </div>
        <div className="flex gap-2">
          <p className="body-2 text-black/80">Total payouts</p>
          <p className="body-2 text-black/80">{data?.total_payout}</p>
        </div>
      </div>
    </div>
  );
}
