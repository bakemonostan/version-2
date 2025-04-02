import React from "react";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { ReviewsTabs } from "./ReviewsTabs";

export default function ReviewSection() {
  return (
    <section className="flex-1 flex-center bg-gradient-to-r from-[#AD75E2]/10 to-[#FFCB4E]/15  py-16 lg:py-[120px] px-3 sm:px-0">
      <Shell>
        <p className="heading-3 text-center pb-16">
          Real Experiences from Kaparki Users
        </p>
        <div className="mx-5 relative">
          <ReviewsTabs />
          <div className="pt-5">
            <Button variant="cta">Browse Vehicles</Button>
          </div>
        </div>
      </Shell>
    </section>
  );
}
