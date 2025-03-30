import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import * as React from "react";
import { Avatar } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileCarousel() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

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
        height={260}
        slideSize="33.333333%"
        slideGap="md"
        loop
        withControls={false}
        align="start"
        getEmblaApi={setEmbla}
        slidesToScroll={3}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselSlide key={index}>
            <Card className="w-[300px] h-full p-4 bg-black/5">
              <CardContent className="flex flex-col justify-between h-full p-0">
                <div>
                  <p className="body-3 text-black/60">
                    Card number {index + 1} <br />
                    &ldquo;I don&apos;t think I can say enough to properly
                    convey the wonderful experience we had renting the campervan
                    from David and Richard!{" "}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <div className="flex flex-col">
                    <p className="body-3 font-semibold text-black/50">
                      Greg David
                    </p>
                    <p className="body-4 font-light text-black/50">Car Name</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselSlide>
        ))}
      </Carousel>
      <div className=" mt-6">
        <p className="body-6 font-extrabold text-black/50 cursor-pointer">
          View more reviews
        </p>
      </div>
    </div>
  );
}
