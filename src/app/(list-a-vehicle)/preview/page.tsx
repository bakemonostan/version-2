/* eslint-disable @next/next/no-img-element */
"use client";
import classes from "@/components/Form/styles/RangeDatePicker.module.css";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
// play test
import {
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  MoveLeft,
  MoveRight,
  ArrowLeftIcon,
  Share,
  MinusSquare,
  PlusSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/ModalContext";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { Divider, Collapse } from "@mantine/core";
import GradientButton from "@/components/GradientButton";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import {
  formatSafetySpec,
  formatTravelFeature,
  safetyKeys,
} from "@/app/(all-vehicles)/all-vehicles/[id]/components/content";
import { VehicleSpecification } from "@/types/dashboard";
import { DatePicker } from "@mantine/dates";
import { VehicleData } from "@/app/(list-a-vehicle)/list-a-vehicle/types";

// Mobile CollapsibleSections component
function MobileCollapsibleSections({
  vehicleData,
}: {
  vehicleData: VehicleData;
}) {
  const [rulesOpened, { toggle: toggleRules }] = useDisclosure(false);
  const [pricingOpened, { toggle: togglePricing }] = useDisclosure(false);
  const [featuresOpened, { toggle: toggleFeatures }] = useDisclosure(false);
  const [safetyOpened, { toggle: toggleSafety }] = useDisclosure(false);
  const [specsOpened, { toggle: toggleSpecs }] = useDisclosure(false);

  const formatCurrencyToEuros = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="py-4 block md:hidden">
      {/* Rules Section */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5">Rules</p>
          <p onClick={toggleRules}>
            {rulesOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={rulesOpened}
          transitionTimingFunction="linear">
          <div className="space-y-5">
            <div className="flex gap-8">
              <p className="flex flex-col gap-3 body-2 font-bold text-black/80 capitalize">
                <span>Travel abroad?</span>
                <span>Who can drive?</span>
                <span>Vehicle care rules</span>
              </p>
              <p className="flex flex-col gap-3 body-2 font-light text-black/80">
                <span>
                  {vehicleData.travel_feature.travel_abroad_allowed === "true"
                    ? "Yes"
                    : "No"}
                </span>
                <span>{vehicleData.travel_feature.who_can_drive}</span>
                <span>{vehicleData.travel_feature.rule}</span>
              </p>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Specifications */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5">Specifications</p>
          <p onClick={toggleSpecs}>
            {specsOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={specsOpened}
          transitionTimingFunction="linear">
          <div className="grid grid-cols-2 gap-y-8">
            <p className="flex items-center gap-2 ">
              <BookMarkIcon />
              <span className="body-alt">
                {vehicleData.specification.interior_color} Interior
              </span>
            </p>
            <p className="flex items-center gap-2">
              <BookMarkIcon />
              <span className="body-alt">
                {vehicleData.specification.exterior_color} Exterior
              </span>
            </p>
            <p className="flex items-center gap-2">
              <BookMarkIcon />
              <span className="body-alt">
                {vehicleData.specification.interior_material}
              </span>
            </p>
          </div>
        </Collapse>
      </div>

      {/* Pricing */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5">Pricing</p>
          <p onClick={togglePricing}>
            {pricingOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={pricingOpened}
          transitionTimingFunction="linear">
          <div className="space-y-5">
            <div className="grid grid-cols-3 py-4 rounded-md bg-black/5 min-h-[6.625rem]">
              <div className="flex flex-col items-center justify-between gap-2">
                <span className="body-secondary font-medium text-center sm:text-sm text-black/75">
                  Rental rate per day
                </span>
                <span className="heading-secondary font-bold">
                  {formatCurrencyToEuros(
                    Number(vehicleData.rental_rate.daily_rate)
                  )}
                </span>
              </div>
              <div className="flex flex-col items-center justify-between gap-2 border-x-2 border-black/5">
                <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                  Kilometer per day
                </span>
                <span className="heading-secondary font-bold">
                  {vehicleData.rental_rate.max_trip_duration}km
                </span>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                  Cost per extra kilometre
                </span>
                <span className="heading-secondary font-bold">
                  {formatCurrencyToEuros(
                    Number(vehicleData.rental_rate.cost_per_km)
                  )}
                </span>
              </div>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Features */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5">Features</p>
          <p onClick={toggleFeatures}>
            {featuresOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={featuresOpened}
          transitionTimingFunction="linear">
          <div className="grid grid-cols-2 gap-y-8">
            {/* Display feature items from array */}
            {vehicleData?.travel_feature.features.map((item) => (
              <p
                key={item.id}
                className="flex items-center gap-2">
                <BookMarkIcon />
                <span className="body-alt">{item.name}</span>
              </p>
            ))}

            {/* Display true boolean features */}
            {vehicleData?.travel_feature &&
              Object.entries(vehicleData.travel_feature)
                .filter(
                  ([key, value]) =>
                    [
                      "travel_abroad_allowed",
                      "smoking_allowed",
                      "pets_allowed",
                      "festival_allowed",
                    ].includes(key) && value === "true"
                )
                .map(([key]) => (
                  <p
                    key={key}
                    className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt">{formatTravelFeature(key)}</span>
                  </p>
                ))}

            {/* Display false boolean features */}
            {vehicleData?.travel_feature &&
              Object.entries(vehicleData.travel_feature)
                .filter(
                  ([key, value]) =>
                    [
                      "travel_abroad_allowed",
                      "smoking_allowed",
                      "pets_allowed",
                      "festival_allowed",
                    ].includes(key) && value === "false"
                )
                .map(([key]) => (
                  <p
                    key={key}
                    className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt">
                      No {formatTravelFeature(key)}
                    </span>
                  </p>
                ))}
          </div>
        </Collapse>
      </div>

      {/* Safety */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5">Safety</p>
          <p onClick={toggleSafety}>
            {safetyOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={safetyOpened}
          transitionTimingFunction="linear">
          <div className="grid grid-cols-2 gap-y-8">
            {vehicleData?.specification &&
              safetyKeys.map((key) => {
                if (key in vehicleData.specification) {
                  const value =
                    vehicleData.specification[
                      key as keyof VehicleSpecification
                    ];
                  if (value === "true") {
                    return (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt">
                          {formatSafetySpec(key)}
                        </span>
                      </p>
                    );
                  } else if (value === "false") {
                    return (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt">
                          {formatSafetySpec(`No ${key}`)}
                        </span>
                      </p>
                    );
                  }
                }
                return null;
              })}
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default function Preview() {
  const { vehicleData } = useBookingStore();
  const router = useRouter();
  const { openModal } = useModal();
  const sm = useMediaQuery("(min-width: 320px)");
  const md = useMediaQuery("(min-width: 610px)");
  const lg = useMediaQuery("(min-width: 1024px)");

  const [vehicleEmbla, setVehicleEmbla] = useState<Embla | null>(null);
  const [vehiclePrevBtnEnabled, setVehiclePrevBtnEnabled] = useState(false);
  const [vehicleNextBtnEnabled, setVehicleNextBtnEnabled] = useState(false);

  const [unavailabilityEmbla, setUnavailabilityEmbla] = useState<Embla | null>(
    null
  );
  const [unavailabilityPrevBtnEnabled, setUnavailabilityPrevBtnEnabled] =
    useState(false);
  const [unavailabilityNextBtnEnabled, setUnavailabilityNextBtnEnabled] =
    useState(false);

  const scrollVehiclePrev = useCallback(
    () => vehicleEmbla && vehicleEmbla.scrollPrev(),
    [vehicleEmbla]
  );
  const scrollVehicleNext = useCallback(
    () => vehicleEmbla && vehicleEmbla.scrollNext(),
    [vehicleEmbla]
  );

  const scrollUnavailabilityPrev = useCallback(
    () => unavailabilityEmbla && unavailabilityEmbla.scrollPrev(),
    [unavailabilityEmbla]
  );
  const scrollUnavailabilityNext = useCallback(
    () => unavailabilityEmbla && unavailabilityEmbla.scrollNext(),
    [unavailabilityEmbla]
  );

  // Vehicle carousel controls
  useEffect(() => {
    if (vehicleEmbla) {
      const onSelect = () => {
        setVehiclePrevBtnEnabled(vehicleEmbla.canScrollPrev());
        setVehicleNextBtnEnabled(vehicleEmbla.canScrollNext());
      };

      vehicleEmbla.on("select", onSelect);
      onSelect();

      return () => {
        vehicleEmbla.off("select", onSelect);
      };
    }
  }, [vehicleEmbla]);

  // Unavailability carousel controls
  useEffect(() => {
    if (unavailabilityEmbla) {
      const onSelect = () => {
        setUnavailabilityPrevBtnEnabled(unavailabilityEmbla.canScrollPrev());
        setUnavailabilityNextBtnEnabled(unavailabilityEmbla.canScrollNext());
      };

      unavailabilityEmbla.on("select", onSelect);
      onSelect();

      return () => {
        unavailabilityEmbla.off("select", onSelect);
      };
    }
  }, [unavailabilityEmbla]);

  if (!vehicleData) {
    return <div>No vehicle data available</div>;
  }

  const formatCurrencyToEuros = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <section className="p-5 sm:space-y-10 mx-auto max-w-[65rem] space-y-6">
      {/* Back button on mobile */}
      <div
        className="flex gap-2 items-center cursor-pointer md:hidden"
        onClick={() => router.push("/form")}>
        <ArrowLeftIcon className="w-4 h-4" />
        <p>Back</p>
      </div>

      {/* Vehicle Image Carousel */}
      <div className="flex flex-col items-center rounded-2xl pt-6 relative">
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
        <div className="absolute bottom-4 right-4 flex gap-4 z-10">
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
            className="rounded-full bg-white/30 hover:bg-white/10 size-10 ">
            <MoveRight className="text-white size-fit" />
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-8 space-y-5">
          {/* Vehicle Status Banner */}
          <div className="bg-[#F9F7DE] rounded-md p-2 w-max">
            <p className="body-3 text-black/80">This Vehicle is roadworthy</p>
          </div>

          {/* Vehicle Title and Info */}
          <div>
            <h1 className="heading-3 font-extrabold pb-2">
              {vehicleData.title}
            </h1>
            <div className="flex items-center gap-2 pb-6 body-2 text-black/80">
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

          {/* Ratings */}
          <div className="pb-7">
            <p className="flex gap-1.5 items-center">
              <span>
                <Star
                  fill="#DBA806"
                  className="size-5 text-[#DBA806]"
                />
              </span>
              <span className="body-1 font-bold"> 3.8 </span>
              <span className="body-3">(Block A billion times)</span>
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 body-secondary border-b border-black/10 pb-8">
            <MapPin className="size-4" />
            <span>{vehicleData.location}</span>
          </div>

          {/* Save and Share Buttons */}
          <div className="flex items-center gap-4 py-6 border-b border-black/10">
            <p className="flex items-center gap-2">
              <span>
                <BookMarkIcon />
              </span>
              <span className="body-3 font-semibold text-black/80">Save</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <Share className="size-4" />
              </span>
              <span className="body-3 font-semibold text-black/80">Share</span>
            </p>
          </div>

          {/* Description */}
          <div className="py-4 space-y-4">
            <p className="heading-5 font-bold uppercase">Description</p>
            <p className="body-2 text-black/80">{vehicleData.description}</p>
          </div>

          {/* Driver Requirements */}
          <div className="py-4 border-y border-black/10">
            <p className="font-bold uppercase heading-5 pb-4">
              Driver requirements
            </p>
            <div className="flex items-center gap-4 pt-4">
              <p className="body-2 font-bold">License category</p>
              <p className="capitalize body-2 font-light ">
                {vehicleData.travel_feature.driver_license_category}
              </p>
            </div>
          </div>

          {/* Desktop Sections - Hidden on Mobile */}
          <div className="hidden md:block">
            {/* Rules */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Rules</p>
              <div className="space-y-5">
                <div className="grid grid-cols-7">
                  <p className="flex flex-col gap-3 body-2 font-bold text-black/80 capitalize col-span-3">
                    <span>Travel abroad?</span>
                    <span>Who can drive?</span>
                    <span>Vehicle care rules</span>
                  </p>
                  <p className="flex flex-col gap-3 body-2 font-light text-black/80 col-span-4">
                    <span>
                      {vehicleData.travel_feature.travel_abroad_allowed ===
                      "true"
                        ? "Yes"
                        : "No"}
                    </span>
                    <span>{vehicleData.travel_feature.who_can_drive}</span>
                    <span>{vehicleData.travel_feature.rule}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Pricing</p>
              <div className="grid grid-cols-3 py-4 rounded-md bg-black/5 min-h-[6.625rem]">
                <div className="flex flex-col items-center justify-between gap-2">
                  <span className="body-secondary font-medium text-center sm:text-sm text-black/75">
                    Rental rate per day
                  </span>
                  <span className="heading-secondary font-bold">
                    {formatCurrencyToEuros(
                      Number(vehicleData.rental_rate.daily_rate)
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-between gap-2 border-x-2 border-black/5">
                  <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                    Kilometer per day
                  </span>
                  <span className="heading-secondary font-bold">
                    {vehicleData.rental_rate.max_trip_duration}km
                  </span>
                </div>
                <div className="flex flex-col items-center justify-between gap-2">
                  <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                    Cost per extra kilometre
                  </span>
                  <span className="heading-secondary font-bold">
                    {formatCurrencyToEuros(
                      Number(vehicleData.rental_rate.cost_per_km)
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Safety</p>
              <div className="grid grid-cols-2 gap-y-8">
                {vehicleData?.specification &&
                  safetyKeys.map((key) => {
                    if (key in vehicleData.specification) {
                      const value =
                        vehicleData.specification[
                          key as keyof VehicleSpecification
                        ];
                      if (value === "true") {
                        return (
                          <p
                            key={key}
                            className="flex items-center gap-2">
                            <BookMarkIcon />
                            <span className="body-alt">
                              {formatSafetySpec(key)}
                            </span>
                          </p>
                        );
                      } else if (value === "false") {
                        return (
                          <p
                            key={key}
                            className="flex items-center gap-2">
                            <BookMarkIcon />
                            <span className="body-alt">
                              {formatSafetySpec(`No ${key}`)}
                            </span>
                          </p>
                        );
                      }
                    }
                    return null;
                  })}
              </div>
            </div>

            {/* Specifications */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">
                Specifications
              </p>
              <div className="grid grid-cols-2 gap-y-8">
                <p className="flex items-center gap-2 ">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {vehicleData.specification.interior_color} Interior
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {vehicleData.specification.exterior_color} Exterior
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {vehicleData.specification.interior_material}
                  </span>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Features</p>
              <div className="grid grid-cols-2 gap-y-8">
                {/* Display feature items from array */}
                {vehicleData?.travel_feature.features.map((item) => (
                  <p
                    key={item.id}
                    className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt">{item.name}</span>
                  </p>
                ))}

                {/* Display true boolean features */}
                {vehicleData?.travel_feature &&
                  Object.entries(vehicleData.travel_feature)
                    .filter(
                      ([key, value]) =>
                        [
                          "travel_abroad_allowed",
                          "smoking_allowed",
                          "pets_allowed",
                          "festival_allowed",
                        ].includes(key) && value === "true"
                    )
                    .map(([key]) => (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt">
                          {formatTravelFeature(key)}
                        </span>
                      </p>
                    ))}

                {/* Display false boolean features */}
                {vehicleData?.travel_feature &&
                  Object.entries(vehicleData.travel_feature)
                    .filter(
                      ([key, value]) =>
                        [
                          "travel_abroad_allowed",
                          "smoking_allowed",
                          "pets_allowed",
                          "festival_allowed",
                        ].includes(key) && value === "false"
                    )
                    .map(([key]) => (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt">
                          No {formatTravelFeature(key)}
                        </span>
                      </p>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Submit Button */}
        <div className="col-span-12 md:col-span-4 h-fit sticky top-24">
          <div className="flex flex-col items-center justify-center p-6 rounded-md bg-black/5">
            <GradientButton
              title="Submit for approval"
              onClick={() =>
                openModal("preview-submission-modal", {
                  title: vehicleData.title,
                })
              }>
              Submit for approval
            </GradientButton>
            <Button
              onClick={() => router.push("/form")}
              className="bg-transparent shadow-none border-none text-black/80 body-2 font-semibold mt-3 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Sections */}
      <MobileCollapsibleSections vehicleData={vehicleData} />

      {/* Availability Section */}
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-4 w-full justify-between pb-6">
            <div className="text-black/80 w-full">
              <div className="flex items-center justify-between w-full pb-4">
                <p className="font-bold uppercase heading-5">Availability</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollUnavailabilityPrev}
                    disabled={!unavailabilityPrevBtnEnabled}
                    className="rounded-full text-black">
                    <ChevronLeft className="size-6 text-black" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollUnavailabilityNext}
                    disabled={!unavailabilityNextBtnEnabled}
                    className="rounded-full text-black">
                    <ChevronRight className="size-6 text-black" />
                  </Button>
                </div>
              </div>
              <p className="text-black/80 body-2 font-normal">
                This vehicle is not available for booking on the marked days
              </p>
            </div>
          </div>
        </div>

        <Carousel
          slideGap="md"
          slideSize="33.333333%"
          withControls={false}
          align="start"
          loop
          slidesToScroll={3}
          getEmblaApi={setUnavailabilityEmbla}
          className="w-full">
          {vehicleData.unavailability_period?.map((period, index) => (
            <CarouselSlide key={index}>
              <div className="bg-black/5 border-none shadow-none rounded-xl flex justify-center items-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-none"></div>
                <div className="flex flex-col justify-between py-4 lg:aspect-[1/1]">
                  <DatePicker
                    classNames={classes}
                    type="range"
                    hideOutsideDates
                    value={[
                      new Date(period.from.replace(/\//g, "-")),
                      new Date(period.to.replace(/\//g, "-")),
                    ]}
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
