import { useEffect, useState } from "react";

interface Photo {
  id: number;
  src: string;
  alt: string;
  rotation: number;
}

// Updated photos array with the user's image and some Unsplash placeholders
const placeholderPhotos: Photo[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Main celebration photo",
    rotation: -3,
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Happy couple moment",
    rotation: 2,
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Beautiful sunset together",
    rotation: -2,
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Special date night",
    rotation: 3,
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Favorite adventure",
    rotation: -1,
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Beautiful memory",
    rotation: 2,
  },
];

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch these from an API
    setPhotos(placeholderPhotos);
  }, []);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <div className="relative mx-auto max-w-4xl py-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2">
          Our Moments
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          Every moment with you is a treasure I hold close to my heart.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`photo-card glass-morphism rounded-lg overflow-hidden shadow-lg transform ${
              loadedCount === photos.length ? "opacity-100" : "opacity-0"
            } transition-opacity duration-700 ease-in-out`}
            style={{
              transitionDelay: `${index * 0.2}s`,
              transform: `rotate(${photo.rotation}deg)`,
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden border-4 border-white p-1">
              <img
                src={photo.src}
                alt={photo.alt}
                onLoad={handleImageLoad}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-3 text-center bg-white/80">
              <p className="text-love-700 font-medium">{photo.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Loading state */}
      {loadedCount < photos.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-love-500 animate-pulse text-xl">
            Loading your memories...
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
