import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import * as React from "react";
import { Avatar, Card, CardSection } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarIcon from "@/components/icons/StarIcon";
import { useMediaQuery } from "@mantine/hooks";

export function ProfileCarousel() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const sm = useMediaQuery("(min-width: 320px)");
  const md = useMediaQuery("(min-width: 610px)");
  const lg = useMediaQuery("(min-width: 1024px)");

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const handleScroll = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      embla.on("select", onSelect);
      onSelect();
      handleScroll();
    }
  }, [embla, onSelect, handleScroll]);

  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 w-full justify-between pb-6">
          <div>
            <p className="body-6 font-extrabold text-black/60">Your reviews</p>
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
      type="container"
      align="center"
      getEmblaApi={setEmbla}
      slideSize={lg ? "336px" : md ? "50%" : sm ? "100%" : "100%"}
      slideGap="lg"
      withControls={false}
      draggable={false}
      containScroll="trimSnaps"
      slidesToScroll={lg ? 3 : md ? 2 : 1}>
      {Array.from({ length: 7 }).map((_, index) => (
        <CarouselSlide
          key={index}
          draggable={false}>
          <Card
            className="bg-white border"
            radius={"lg"}
            h={327.71}>
            <CardSection className="p-4">
              <div className="flex flex-col">
                <div className="pb-6">
                  <div className="flex">
                    <Avatar size={32} />
                    <div className="w-full pl-2">
                      <p className="flex justify-between items-center">
                        <span className="body-3 font-semibold pb-[1.5px]">
                          John Doe
                        </span>
                        <span className="flex items-center">
                          <StarIcon className="w-[13px] h-[12.77px] pl-0.5" />
                          <span className="body-2 font-bold">3.8</span>/
                          <span className="body-2 font-semibold">5</span>
                        </span>
                      </p>
                      <p className="body-4 font-light flex gap-1 items-center">
                        4x guest on Kaparki{" "}
                        <span className="size-1 bg-black/60 block rounded-full"></span>{" "}
                        Joined Sept 2023
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="body-2 font-normal pb-4">
                    Hallo Daar, pasgeleden hebben wij deze fantastische camper
                    gekocht. We zijn van plan er vele mooie reiz...
                  </p>
                </div>
                <div className="pb-6">
                  <p className="body-3 font-semibold underline flex gap-1">
                    Read more{" "}
                    <span>
                      <ChevronDownIcon className="size-3.5 mt-0.5" />
                    </span>
                  </p>
                </div>

                <div className="pb-6">
                  <Carousel
                    controlSize={14}
                    align="start"
                    slideSize="100px"
                    height={55}
                    containScroll="trimSnaps"
                    slidesToScroll={3}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <CarouselSlide
                        key={index}
                        draggable={false}>
                        <img
                          src="/images/car-image-hero.jpg"
                          alt="Review 1"
                          className="w-full h-full object-cover px-0.5 rounded-lg"
                        />
                      </CarouselSlide>
                    ))}
                  </Carousel>
                </div>
                <p className="body-3 text-black/75 pb-3.5">
                  Reviewed by Maurice - Aug 2024
                </p>
              </div>
            </CardSection>
          </Card>
        </CarouselSlide>
      ))}
    </Carousel>
    </div>
  );
}
