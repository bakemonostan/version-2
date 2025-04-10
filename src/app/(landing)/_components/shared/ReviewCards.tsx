/* eslint-disable @next/next/no-img-element */
"use client";
import { useMediaQuery, useMounted } from "@mantine/hooks";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import mainCarouselClasses from "../../_styles/Review.module.css";
import { Avatar, Card, CardSection, Skeleton } from "@mantine/core";
import StarIcon from "@/components/icons/StarIcon";
import { ChevronDownIcon } from "lucide-react";

export function Reviews() {
  const sm = useMediaQuery("(min-width: 320px)");
  const md = useMediaQuery("(min-width: 610px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const mounted = useMounted();
  return !mounted ? (
    <div className="flex gap-4">
      <Skeleton
        h={327.71}
        w={350}
      />
      <Skeleton
        h={327.71}
        w={350}
      />
      <Skeleton
        h={327.71}
        w={350}
      />
    </div>
  ) : (
    <Carousel
      type="container"
      align="center"
      slideSize={lg ? "336px" : md ? "50%" : sm ? "100%" : "100%"}
      slideGap="lg"
      draggable={false}
      containScroll="trimSnaps"
      slidesToScroll={lg ? 3 : md ? 2 : 1}
      classNames={{
        controls: mainCarouselClasses.controls,
        control: mainCarouselClasses.control,
        viewport: mainCarouselClasses.viewport,
      }}>
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
  );
}
