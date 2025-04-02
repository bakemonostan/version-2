"use client";

import { ListingsModal } from "@/app/(dashboard)/dashboard/listings/_components/ListingModal";
import { EditBioModal } from "@/app/(dashboard)/dashboard/my-account/_components/EditBioModal";
import EditDetailsModal from "@/app/(dashboard)/dashboard/my-account/_components/EditDetailsModal";
import ListAVehicleAddressModal from "@/app/(list-a-vehicle)/list-a-vehicle/components/modals/ListAVehicleAddressModal";
import VehicleTypeModal from "@/app/(list-a-vehicle)/list-a-vehicle/components/modals/VehicleTypeModal";
import UnavailabilityPeriods from "@/app/(list-a-vehicle)/list-a-vehicle/components/UnavailabilityPeriods";
import { PreviewSubmissionModal } from "@/app/(list-a-vehicle)/preview/components/PreviewSubmissionModal";
import { HeroSearchModal } from "@/app/(landing)/_components/home/HeroSearchModal";

export function ModalRegistry() {
  return (
    <>
      <ListingsModal />
      <EditBioModal />
      <EditDetailsModal />
      <ListAVehicleAddressModal />
      <VehicleTypeModal />
      <UnavailabilityPeriods />
      <PreviewSubmissionModal />
      <HeroSearchModal />
    </>
  );
}
