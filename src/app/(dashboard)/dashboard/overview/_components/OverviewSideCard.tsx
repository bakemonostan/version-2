"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardSection } from "@mantine/core";
import { AlertCircleIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserDetails } from "@/services/dashboard";
import DashboardCardSkeleton from "../../_components/skeletons/DashboardCardSkeleton";
export default function OverviewSideCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails(),
  });

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  return (
    <aside>
      <Card>
        <CardSection>
          <div className="flex flex-col items-center p-4">
            <Avatar
              className="w-[72px] h-[72px] border"
              withGradientBorder>
              <AvatarImage
                src={data?.data.data.picture || "https://picsum.photos/700"}
                alt="Profile picture"
              />
              <AvatarFallback>😀</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-body-2 leading-body-2 font-bold text-black/75 pb-1">
                {data?.data.data.legal_name}
              </p>
              <p className="pb-4 font-light text-body-3 leading-body-3 text-black/70">
                {data?.data.data.email}
              </p>
            </div>
            {!data?.data.data.bank_verification ? (
              <div className="text-center bg-[#F9F7DE] py-4 px-2 rounded-md">
                <AlertCircleIcon className="mx-auto text-red-400" />
                <p className="body-3 font-normal px-2 pt-2">
                  Identity not verified. Verify your account by adding a valid
                  bank account
                </p>
              </div>
            ) : null}
            <div className="w-full pt-4">
              <Button
                className="w-full rounded-4xl border-black/50"
                variant={"outline"}>
                Edit Profile
              </Button>
            </div>
          </div>
        </CardSection>
      </Card>
    </aside>
  );
}
