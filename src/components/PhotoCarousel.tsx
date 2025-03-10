
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  rotation: number;
}

// Using the same photos as PhotoGallery
const carouselPhotos: Photo[] = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Main celebration photo',
    rotation: -3
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Happy couple moment',
    rotation: 2
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Beautiful sunset together',
    rotation: -2
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Special date night',
    rotation: 3
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Favorite adventure',
    rotation: -1
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Beautiful memory',
    rotation: 2
  }
];

const PhotoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState<Photo | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovering) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovering]);

  const startAutoScroll = () => {
    autoScrollRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselPhotos.length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? carouselPhotos.length - 1 : activeIndex - 1;
    goToSlide(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % carouselPhotos.length;
    goToSlide(newIndex);
  };

  // Handle photo hover
  const handlePhotoHover = (photo: Photo) => {
    setIsHovering(true);
    setHoveredPhoto(photo);
  };

  const handlePhotoLeave = () => {
    setIsHovering(false);
    setHoveredPhoto(null);
  };

  // Sync carousel scroll with active index
  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: activeIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative mx-auto max-w-4xl py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2">Our Journey</h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">Swipe through the memories we've created together</p>
      </div>

      {/* Main Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev} 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-love-600 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={handleNext} 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-love-600 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {carouselPhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className="min-w-full flex justify-center items-center snap-center p-4"
            >
              <div 
                className="carousel-card relative w-full max-w-lg mx-auto transition-all duration-300"
                style={{ transform: `scale(${activeIndex === index ? 1 : 0.9})` }}
                onMouseEnter={() => handlePhotoHover(photo)}
                onMouseLeave={handlePhotoLeave}
                onTouchStart={() => handlePhotoHover(photo)}
                onTouchEnd={handlePhotoLeave}
              >
                <div className="relative aspect-video overflow-hidden rounded-xl border-4 border-white shadow-xl">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <p className="font-medium">{photo.alt}</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-b-xl shadow-md">
                  <p className="text-love-700 font-medium flex items-center justify-center">
                    <Heart size={16} className="text-love-500 mr-2" fill="#FB8CA9" />
                    <span>Memory #{index + 1}: {photo.alt}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {carouselPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === index ? 'bg-love-600' : 'bg-love-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Enlarged Photo Overlay */}
      {isHovering && hoveredPhoto && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={handlePhotoLeave}>
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl p-2 shadow-2xl transform transition-transform duration-300 scale-in-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handlePhotoLeave}
              className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-love-600 transition-all"
              aria-label="Close enlarged view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6L18 18"></path>
              </svg>
            </button>
            
            <div className="rounded-lg overflow-hidden">
              <img 
                src={hoveredPhoto.src} 
                alt={hoveredPhoto.alt}
                className="max-h-[70vh] object-contain w-full"
              />
            </div>
            
            <div className="p-6 bg-white text-center">
              <h3 className="text-xl font-display font-bold text-love-700 mb-2">{hoveredPhoto.alt}</h3>
              <p className="text-love-600">Every picture tells our story, a journey filled with love, laughter, and adventure.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;
