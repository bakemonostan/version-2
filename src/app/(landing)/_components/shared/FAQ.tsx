"use client";
import Shell from "@/components/Shell";
import React from "react";
import { FAQTabs } from "./FAQTAbs";

export default function FAQ() {
  return (
    <section className="py-32 mb-24">
      <Shell>
        <p className="heading-3 text-center pb-12">Your questions answered</p>
        <FAQTabs />
      </Shell>
    </section>
  );
}
