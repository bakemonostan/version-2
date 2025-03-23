import { RocketShipIcon, TickCircleIcon } from "@/components/icons";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EarnMoneySection() {
  return (
    <section className="relative overflow-hidden py-32">
      <Shell>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold">
              For Renters (Find & Book Vehicles)
            </h3>

            <div className="space-y-5">
              <p className="flex gap-3 items-start">
                <TickCircleIcon />
                <span>
                  No long-term commitments—rent for a day, a week, or more
                </span>
              </p>
              <p className="flex gap-3 items-start">
                <TickCircleIcon />
                <span>Choose from adventure, work, or specialty vehicles.</span>
              </p>
              <p className="flex gap-3 items-start">
                <TickCircleIcon />
                <span>Option for vehicle delivery at your convenience.</span>
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <Button variant="cta" className="w-max">
                <Link href="/" className="button-text">
                  How it works
                </Link>
              </Button>
              <Button variant="link" className="w-max">
                <Link href="/" className="button-text">
                  See reviews
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="space-y-8">
                <p className="header-4 flex gap-2 items-center">
                  <span>
                    <RocketShipIcon />
                  </span>
                  Getting Started is Simple
                </p>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={
                      "relative bg-white w-[500px] min-h-[154px] rounded-3xl border p-4 gap-2 flex justify-between" +
                      (index < 2
                        ? " after:content after:inline-block after:h-8 after:w-1 after:bg-[#DBA806] after:absolute after:left-10 after:-z-10 after:-bottom-8 after:transform after:-translate-x-1/2"
                        : "")
                    }
                  >
                    <div>
                      <div className="border border-black flex items-center justify-center w-8 h-8 body-1-black bg-[#FFFEEE] rounded-full">
                        {index + 1}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="body-1-black ">Find the Right Vehicle</h3>
                      <p className="body-1-medium text-black/80">
                        Enter your location and dates to browse a variety of
                        vehicles—from everyday cars to camper vans, motorcycles,
                        and specialty rides.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
