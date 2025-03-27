
import * as React from "react";
import { Heart } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const memories: Photo[] = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    alt: 'First anniversary dinner'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg',
    alt: 'Beach vacation in Goa'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
    alt: 'Beautiful sunset in Chennai'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/5874231/pexels-photo-5874231.jpeg',
    alt: 'Hiking trip to the mountains'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg',
    alt: 'Stargazing night picnic'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg',
    alt: 'Birthday celebration at home'
  }
];

export default function MomentCarousel() {
  return (
    <div className="relative mx-auto max-w-4xl py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2">Our Precious Moments</h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">Every memory tells a story of our journey together</p>
      </div>
      
      <Carousel className="mx-auto w-full max-w-3xl">
        <CarouselContent>
          {memories.map((photo, index) => (
            <CarouselItem key={photo.id}>
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={photo.src} 
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-white flex items-center justify-center">
                    <p className="text-love-700 font-medium flex items-center">
                      <Heart size={16} className="text-love-500 mr-2" fill="#FB8CA9" />
                      <span>Memory {index + 1}: {photo.alt}</span>
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:-left-6" />
        <CarouselNext className="right-2 lg:-right-6" />
      </Carousel>
    </div>
  );
}
