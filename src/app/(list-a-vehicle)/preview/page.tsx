/* eslint-disable @next/next/no-img-element */
"use client";

import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/ModalContext";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { UnavailabilityCalendar } from "@/components/calendar/UnavailabilityCalendar";
import { useCallback, useEffect, useState } from "react";
import { Divider } from "@mantine/core";

export default function Preview() {
  const { vehicleData } = useBookingStore();
  const router = useRouter();
  const { openModal } = useModal();
  const sm = useMediaQuery("(min-width: 320px)");
  const md = useMediaQuery("(min-width: 610px)");
  const lg = useMediaQuery("(min-width: 1024px)");

  const [embla, setEmbla] = useState<Embla | null>(null);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", () => {
      setPrevBtnEnabled(embla.selectedScrollSnap() !== 0);
      setNextBtnEnabled(
        embla.selectedScrollSnap() !== embla.scrollSnapList().length - 1
      );
    });
  }, [embla]);

  const [vehicleEmbla, setVehicleEmbla] = useState<Embla | null>(null);
  const [vehiclePrevBtnEnabled, setVehiclePrevBtnEnabled] = useState(false);
  const [vehicleNextBtnEnabled, setVehicleNextBtnEnabled] = useState(false);

  const scrollVehiclePrev = useCallback(() => vehicleEmbla && vehicleEmbla.scrollPrev(), [vehicleEmbla]);
  const scrollVehicleNext = useCallback(() => vehicleEmbla && vehicleEmbla.scrollNext(), [vehicleEmbla]);

  const onVehicleSelect = useCallback(() => {
    if (!vehicleEmbla) return;
    setVehiclePrevBtnEnabled(vehicleEmbla.canScrollPrev());
    setVehicleNextBtnEnabled(vehicleEmbla.canScrollNext());
  }, [vehicleEmbla]);

  const handleVehicleScroll = useCallback(() => {
    if (!vehicleEmbla) return;
  }, [vehicleEmbla]);

  useEffect(() => {
    if (vehicleEmbla) {
      vehicleEmbla.on("scroll", handleVehicleScroll);
      vehicleEmbla.on("select", onVehicleSelect);
      onVehicleSelect();
      handleVehicleScroll();
    }
  }, [vehicleEmbla, onVehicleSelect, handleVehicleScroll]);

  if (!vehicleData) {
    return <div>No vehicle data available</div>;
  }

  const formatCurrencyToEuros = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatSpecKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filteredSpecifications = Object.fromEntries(
    Object.entries(vehicleData.specification).filter(([key]) => key !== "id")
  );

  // const unavailabilityPeriods =
  //   vehicleData.unavailability_period?.map((period) => ({
  //     highlight: {
  //       color: "brand-yellow",
  //     },
  //     dates: [
  //       [
  //         new Date(period.from.replace(/\//g, "-")),
  //         new Date(period.to.replace(/\//g, "-")),
  //       ],
  //     ],
  //   })) || [];


  return (
    <section className="p-5 sm:space-y-10 mx-auto max-w-[65rem] space-y-6">
      <div className="flex flex-col items-center rounded-2xl pt-6">
        <Carousel
          type="container"
          align="center"
          withControls={false}
          withIndicators
          slideSize={lg ? "100%" : md ? "100%" : sm ? "100%" : "100%"}
          slideGap="md"
          containScroll="trimSnaps"
          slidesToScroll={1}
          className="w-full"
          getEmblaApi={setVehicleEmbla}>
          {vehicleData.images.map((item) => (
            <CarouselSlide key={item.id}>
              <div>
                <img
                  src={item.image}
                  alt=""
                  className="object-cover w-full aspect-[1/1] sm:aspect-[2/1] rounded-2xl"
                />
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
        <div className="absolute bottom-4 right-4 flex gap-8 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollVehiclePrev}
            disabled={!vehiclePrevBtnEnabled}
            className="rounded-full bg-white/30 hover:bg-white/10 size-10">
            <MoveLeft className="text-white size-fit" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollVehicleNext}
            disabled={!vehicleNextBtnEnabled}
            className="rounded-full bg-white/30 hover:bg-white/10 size-10">
            <MoveRight className="text-white size-fit" />
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-12 border border-black">
        <div className="col-span-8 space-y-5">
          <div>
            <h1 className="heading-3 font-extrabold">{vehicleData.title}</h1>
            <div className="flex items-center gap-2">
              <span>{vehicleData.type.name}</span>
              <Divider
                orientation="vertical"
                className="h-6 border bg-black/10 border-black/10 w-[2px]"
              />

              <span>{vehicleData.make.name}</span>
              <Divider
                orientation="vertical"
                className="h-6 border bg-black/10 border-black/10 w-[2px]"
              />
              <span>{vehicleData.year}</span>
            </div>
          </div>
          <div>
            <p className="flex gap-1.5 items-center">
              <span>
                <Star
                  fill="#DBA806"
                  className="size-5 text-[#DBA806]"
                />
              </span>
              <span> 3.8 </span>
              <span className="text-xs">(Block A billion times)</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="size-4" />
            <span>{vehicleData.location}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center col-span-4 rounded-md bg-black/5">
          <Button
            variant="default"
            className="bg-gradient-to-r from-primary to-primary/80"
            onClick={() =>
              openModal("preview-submission-modal", {
                title: vehicleData.title,
              })
            }>
            Submit for approval
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/form")}
            className="mt-2">
            Back
          </Button>
        </div>
      </div>

      <div className="grid space-y-6 sm:grid-cols-12 border border-black">
        <div className="col-span-8">
          <div>
            <p className="pb-2 font-bold text-black">Description</p>
            <p>{vehicleData.description}</p>
          </div>
          <Separator
            orientation="horizontal"
            className="my-12 border"
          />

          <div>
            <p className="pb-2 font-bold text-black">Driver requirements</p>
            <div className="grid max-w-xs grid-cols-2">
              <p>License category</p>
              <p className="capitalize">
                {vehicleData.travel_feature.driver_license_category}
              </p>
            </div>
          </div>
          <Divider
                orientation="vertical"
                className=" bg-black/30 w-[2px]"
              />

          <div className="space-y-5">
            <p className="pb-2 font-bold text-black">Rules</p>
            <div className="grid grid-cols-2">
              <p className="flex flex-col gap-3">
                <span>Travel abroad?</span>
                <span>Who can drive?</span>
                <span>Vehicle care rules</span>
              </p>
              <p className="flex flex-col gap-3 text-sm capitalize sm:text-base">
                <span>
                  {vehicleData.travel_feature.travel_abroad_allowed
                    ? "Yes"
                    : "No"}
                </span>
                <span>{vehicleData.travel_feature.who_can_drive}</span>
                <span>{vehicleData.travel_feature.rule}</span>
              </p>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="my-12 border"
          />

          <div className="space-y-5">
            <p className="pb-2 font-bold text-black">Pricing</p>
            <div className="grid grid-cols-3 px-2 py-4 rounded-md bg-black/10">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-center sm:text-sm">
                  Rental rate per day
                </span>
                <span className="text-lg font-bold">
                  {formatCurrencyToEuros(
                    Number(vehicleData.rental_rate.daily_rate)
                  )}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 border-x-2 border-black/5">
                <span className="text-xs font-bold text-center sm:text-sm">
                  Kilometer per day
                </span>
                <span className="text-lg font-bold">
                  {vehicleData.rental_rate.max_trip_duration}km
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-center sm:text-sm">
                  Cost per extra km
                </span>
                <span className="text-lg font-bold">
                  {formatCurrencyToEuros(
                    Number(vehicleData.rental_rate.cost_per_km)
                  )}
                </span>
              </div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="my-12 border"
          />

          <div>
            <p className="font-bold">Safety</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {Object.entries(filteredSpecifications)
                .filter(([, value]) => value === "true")
                .map(([key]) => (
                  <p
                    key={key}
                    className="flex items-center gap-2">
                    <Bookmark className="size-4 text-black/70" />
                    {formatSpecKey(key)}
                  </p>
                ))}
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="my-12 border"
          />

          <div>
            <p className="pb-2 font-bold text-black">Specifications</p>
            <div className="grid grid-cols-2">
              <p className="flex items-center gap-2">
                <Bookmark className="size-4 text-black/70" />
                {vehicleData.specification.interior_color} Interior
              </p>
              <p className="flex items-center gap-2">
                <Bookmark className="size-4 text-black/70" />
                {vehicleData.specification.exterior_color} Exterior
              </p>
              <p className="flex items-center gap-2">
                <Bookmark className="size-4 text-black/70" />
                {vehicleData.specification.interior_material}
              </p>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="my-12 border"
          />

          <div>
            <p className="pb-2 font-bold text-black">Features</p>
            <div className="grid grid-cols-2 gap-4">
              {vehicleData.travel_feature.features.map((item) => (
                <p
                  key={item.id}
                  className="flex items-center gap-2">
                  <Bookmark className="size-4 text-black/70" />
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-4 w-full justify-between pb-6">
            <div>
              <p className="text-lg font-bold uppercase">Availability</p>
              <p className="text-black/60">
                This vehicle is not available for booking on the marked days
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Carousel
          slideGap="md"
          loop
          slideSize={lg ? "40.33%" : md ? "100%" : sm ? "100%" : "100%"}
          withControls={false}
          align="start"
          getEmblaApi={setEmbla}
          slidesToScroll={lg ? 2 : md ? 2 : 1}
          className="w-full">
          {vehicleData.unavailability_period?.map((period, index) => (
            <CarouselSlide key={index}>
              <div className="bg-none border-none shadow-none min-h-[382px] max-w-[375px] rounded-xl">
                <div className="flex flex-col justify-between py-4 lg:aspect-[1/1]">
                  <UnavailabilityCalendar
                    unavailabilityPeriod={period}
                    selected={{
                      from: new Date(period.from.replace(/\//g, "-")),
                      to: new Date(period.to.replace(/\//g, "-")),
                    }}
                  />
                </div>
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
