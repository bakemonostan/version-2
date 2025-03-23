import React from "react";
import LandingNavbar from "./_components/shared/Navbar";
import { FAQ, ReviewSection } from "./_components";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 pb-16">
          {children}
          <ReviewSection />
          <FAQ />
        </main>
      </div>
    </>
  );
}
