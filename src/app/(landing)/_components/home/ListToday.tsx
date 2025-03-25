"use client";

import { TickCircleIcon } from "@/components/icons";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ListToday() {
  return (
    <section className="py-[92px]">
      <Shell className="bg-landing-bg rounded-4xl lg:p-16">
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          <div className=" space-y-6">
            <h2 className="heading-3">
              Turn Your Vehicle Into Income <br /> - List It Today!
            </h2>

            <p className="body-1 font-light pb-2">
              Make money from your vehicle when you&apos;re not using it. List
              cars, camper vans, food trucks, and more—fully on your terms, with
              secure payments and verified renters.
            </p>

            <div className="space-y-4">
              <p className="flex gap-3 items-start body-1-light pr-6">
                <TickCircleIcon className="text-primary " />
                <span>
                  Earn passive income - Turn your vehicle into a revenue stream
                  effortlessly
                </span>
              </p>
              <p className="flex gap-3 items-start body-1-light pr-6">
                <TickCircleIcon className="text-primary" />
                <span>
                  Full control - Set your own prices, availability, and rental
                  terms.
                </span>
              </p>
              <p className="flex gap-3 items-start body-1-light pr-6">
                <TickCircleIcon className="text-primary" />
                <span>
                  Safe & secure - Verified renters, secure payments, and full
                  transparency.
                </span>
              </p>
            </div>

            <div className="flex gap-4 mt-9">
              <Button variant="cta" className="w-max">
                <Link href="/list" className="button-text">
                  Start Listing
                </Link>
              </Button>
              <Button variant="link" className="w-max">
                <Link href="/how-it-works" className="button-text">
                  {" "}
                  See how it works
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/car-image-hero.jpg"
              alt="Person with car"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}
