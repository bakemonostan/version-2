/* eslint-disable @next/next/no-img-element */
import { Vehicle } from "@/types/allVehicles";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import classes from '../../(dashboard)/dashboard/_components/ImageCarousel.module.css';

export default function VehicleImageCarousel({ data }: { data: Vehicle }) {

  return (
    <div className="relative">
      <Carousel
        withControls
        draggable
        classNames={{
          ...classes,
          controls: classes.controls,
          indicators: classes.indicators
        }}
      >
        {data.image.map((img) => (
          <CarouselSlide key={img.id}>
            <img
              src={img.image}
              alt={`${data.make} ${data.model}`}
              className="object-cover h-[18.75rem] lg:h-[13.75rem] w-full rounded-xl"  
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}
