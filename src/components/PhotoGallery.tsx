
import { useEffect, useState } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  rotation: number;
}

const placeholderPhotos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68',
    alt: 'Happy couple moment',
    rotation: -3
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1530653333484-8e3c8a2b5cea',
    alt: 'Beautiful sunset together',
    rotation: 2
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1542378151504-0361364c1ec3',
    alt: 'Special date night',
    rotation: -2
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672',
    alt: 'Favorite adventure',
    rotation: 3
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47',
    alt: 'Beautiful memory',
    rotation: -1
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1536075829770-5f05bca6b9af',
    alt: 'Special day',
    rotation: 2
  }
];

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  
  useEffect(() => {
    // In a real app, you would fetch these from an API
    setPhotos(placeholderPhotos);
  }, []);
  
  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };
  
  return (
    <div className="relative mx-auto max-w-4xl py-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2">Our Moments</h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">Every moment with you is a treasure I hold close to my heart.</p>
      </div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`photo-card glass-morphism rounded-lg overflow-hidden shadow-lg transform ${loadedCount === photos.length ? 'animate-photo-float' : 'opacity-0'}`}
            style={{
              animationDelay: `${index * 0.2}s`,
              transform: `rotate(${photo.rotation}deg)`,
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                onLoad={handleImageLoad}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-3 text-center">
              <p className="text-love-700 font-medium">{photo.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
