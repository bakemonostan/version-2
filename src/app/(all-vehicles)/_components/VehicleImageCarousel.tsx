/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselSlide } from "@mantine/carousel";
import classes from '../../(dashboard)/dashboard/_components/ImageCarousel.module.css';
import { Vehicle as VehicleType } from "@/types/dashboard";
import { Vehicle as AllVehicleType } from "@/types/allVehicles";

interface VehicleImageCarouselProps {
  data: VehicleType | AllVehicleType;
  withControls?: boolean;
  withIndicators?: boolean;
  draggable?: boolean;
  height?: string;
}   


  export default function VehicleImageCarousel({ data, withControls = true, withIndicators = true, draggable = false, height = 'h-[22.5625rem] lg:h-[13.75rem]' }: VehicleImageCarouselProps) {
    // Determine the images to use based on the vehicle type
  const images = 'images' in data ? data.images : 'image' in data ? data.image : [];

  return (
    <div className="relative">
      <Carousel
        withControls={withControls}
        draggable={draggable}
        loop
        slideGap={'sm'}
        withIndicators={withIndicators}  
        classNames={classes}
      >
        {images.map((img) => (
          <CarouselSlide key={img.id}>
            <img
              src={img.image}
              alt={`${data.make} ${data.model}`}
              className={`object-cover ${height} w-full rounded-xl`}  
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}
