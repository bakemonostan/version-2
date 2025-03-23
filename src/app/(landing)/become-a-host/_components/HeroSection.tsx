import Shell from "@/components/Shell";
import React from "react";

export default function HeroSection() {
  return (
    <section className="flex-1 flex-center bg-gradient-to-r from-[#AD75E2]/15 to-[#FFCB4E]/15 py-16">
      <Shell>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-[500px]">
            <h1 className="heading-hero-2 pb-6">
              Turn your vehicle into passive income!
            </h1>
            <p className="body-1-medium">
              List your car, camper, or specialty ride on Kaparki and start
              earning from people who need it.
            </p>
          </div>
          <div className="">
            <div className="rounded-2xl p-4 bg-white overflow-hidden w-[500px] h-[453.17px] relative">
              <img
                src="/images/kpk-hero-3.png"
                alt="Vehicle rental"
                className="rounded-2xl w-full h-full"
              />
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
