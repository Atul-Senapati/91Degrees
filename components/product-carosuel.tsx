import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imagePaths = [
     "/slide4.png",
  "/slide5.png",
  "/slide1.png",
  "/slide2.jpeg",
  "/slide3.png",
  "/slide8.png",
  // "/slide7.png",
 
];

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {imagePaths.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-0 overflow-hidden">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={800}
                    height={850}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
