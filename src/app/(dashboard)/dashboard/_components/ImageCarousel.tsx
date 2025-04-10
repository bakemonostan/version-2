import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Image } from "@mantine/core";
import React from "react";
import classes from "./ImageCarousel.module.css";

interface ImageCarouselProps {
  images: string[];
}
export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div>
      <Carousel
        slideGap="md"
        loop
        classNames={classes}
        withIndicators>
        {images.map((image) => (
          <CarouselSlide key={image}>
            <Image
              src={image}
              alt="Carousel Image"
              h={400}
            
              radius="lg"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}
