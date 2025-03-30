"use client";
import { useUserStore } from "@/store/userStore";
import DetailsCompoennt from "./DetailsCompoennt";
import { ProfileCarousel } from "@/app/(dashboard)/dashboard/my-account/_components/ProfileCarousel";

export default function PersonalDetails() {
  const { user } = useUserStore();
  console.log(user);
  return (
    <div className="flex flex-col">
      <DetailsCompoennt
        title="Legal name"
        subtitle={user?.legal_name}
      />
      <DetailsCompoennt
        title="Residential address"
        subtitle={user?.address || "No address added"}
        withLink={true}
      />
      <DetailsCompoennt
        title="Email address"
        subtitle={user?.email}
        withLink={true}
      />

      <DetailsCompoennt
        title="Phone number"
        subtitle={user?.telephone || "No phone number added"}
        withLink={true}
        info="Your number will only be shared with someone you have a confirmed booking with."
      />
      <div className="mt-10">
        <ProfileCarousel />
      </div>
    </div>
  );
}
