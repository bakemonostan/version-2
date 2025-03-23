 "use client";
 import { useMediaQuery, useMounted } from "@mantine/hooks";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import mainCarouselClasses from "../../_styles/Review.module.css";
import { Avatar, Card, CardSection, Skeleton } from "@mantine/core";
import StarIcon from "@/components/icons/StarIcon";

export function Reviews() {
  const sm = useMediaQuery("(min-width: 320px)");
  const md = useMediaQuery("(min-width: 610px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const mounted = useMounted();
  return !mounted ? (
    <div className="flex gap-4">
      <Skeleton h={327.71} w={350} />
      <Skeleton h={327.71} w={350} />
      <Skeleton h={327.71} w={350} />
    </div>
  ) : (
    <Carousel
      withIndicators
      type="container"
      align="center"
      draggable={false}
      slideSize={lg ? "33.333333%" : md ? "50%" : sm ? "100%" : "100%"}
      slideGap="md"
      containScroll="trimSnaps"
      slidesToScroll={lg ? 3 : md ? 2 : 1}
      classNames={{
        controls: mainCarouselClasses.controls,
        control: mainCarouselClasses.control,
        viewport: mainCarouselClasses.viewport,
      }}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <CarouselSlide key={index}>
          <Card className="bg-white border" radius={"lg"} h={327.71}>
            <CardSection className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Avatar />
                  {/*  */}
                  <div className="flex flex-col gap-1">
                    <p>John Doe</p>
                    <p>
                      4x guest on Kaparki <span></span> Joined Sept 2023
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span>3.8/5</span>
                  </div>
                </div>

                <div>
                  <p>
                    Hallo Daar, pasgeleden hebben wij deze fantastische camper
                    gekocht. We zijn van plan er vele mooie reiz...
                  </p>
                </div>
                <div>
                  <p>Read more</p>
                </div>

                <div>
                  <Carousel
                    controlSize={14}
                    dragFree
                    align="start"
                    type="container"
                    slideSize="100px"
                    height={55}
                    slidesToScroll={3}
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <CarouselSlide key={index}>
                        <img
                          src="/images/car-image-hero.jpg"
                          alt="Review 1"
                          className="w-full h-full object-cover px-0.5 rounded-lg"
                        />
                      </CarouselSlide>
                    ))}
                  </Carousel>
                </div>
              </div>
            </CardSection>
          </Card>
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
