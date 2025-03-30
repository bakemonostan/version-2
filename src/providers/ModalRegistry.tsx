"use client";

import { ListingsModal } from "@/app/(dashboard)/dashboard/listings/_components/ListingModal";
import { EditBioModal } from "@/app/(dashboard)/dashboard/my-account/_components/EditBioModal";
import EditDetailsModal from "@/app/(dashboard)/dashboard/my-account/_components/EditDetailsModal";

export function ModalRegistry() {
  return (
    <>
      <ListingsModal />
      <EditBioModal />
      <EditDetailsModal />
    </>
  );
}
