"use client";

import { ListingsModal } from "@/app/(dashboard)/dashboard/listings/_components/ListingModal";
import { EditBioModal } from "@/app/(dashboard)/dashboard/my-account/_components/EditBioModal";
import EditDetailsModal from "@/app/(dashboard)/dashboard/my-account/_components/EditDetailsModal";
import ListAVehicleAddressModal from "@/app/(list-a-vehicle)/list-a-vehicle/components/modals/ListAVehicleAddressModal";
export function ModalRegistry() {
  return (
    <>
      <ListingsModal />
      <EditBioModal />
      <EditDetailsModal />
      <ListAVehicleAddressModal />
    </>
  );
}
