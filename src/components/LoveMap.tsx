
import { useState } from 'react';
import { MapPin, Map } from 'lucide-react';

interface MapLocation {
  id: number;
  name: string;
  description: string;
  imageSrc?: string;
  coordinates: { x: number; y: number };
}

// Sample map locations - you can customize these
const mapLocations: MapLocation[] = [
  {
    id: 1,
    name: "Where We First Met",
    description: "The magical place where our story began.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coordinates: { x: 20, y: 30 }
  },
  {
    id: 2,
    name: "First Date",
    description: "Our unforgettable first dinner together.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coordinates: { x: 50, y: 40 }
  },
  {
    id: 3,
    name: "Our Favorite Spot",
    description: "The place we always return to.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coordinates: { x: 75, y: 60 }
  },
  {
    id: 4,
    name: "Future Dream Vacation",
    description: "Where we'll go next on our journey together.",
    imageSrc: "https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coordinates: { x: 35, y: 70 }
  },
];

const LoveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Map className="mr-2 text-love-600" size={24} />
          Map of Our Love
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          Special places in our journey together
        </p>
      </div>

      <div className="relative">
        {/* The map background */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl glass-morphism p-4 shadow-lg">
          <div className="absolute inset-0 m-4 rounded-lg bg-love-100/50 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3217513/pexels-photo-3217513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Our love map" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          {/* Map location pins */}
          {mapLocations.map((location) => (
            <button
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none"
              style={{ 
                left: `${location.coordinates.x}%`, 
                top: `${location.coordinates.y}%` 
              }}
              onClick={() => setSelectedLocation(location)}
              aria-label={`View ${location.name}`}
            >
              <div className="relative">
                <MapPin 
                  size={32} 
                  className="text-love-600 filter drop-shadow-md" 
                  fill={selectedLocation?.id === location.id ? "#F43F75" : "transparent"}
                />
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-love-300 rounded-full animate-ping" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Location details card */}
        {selectedLocation && (
          <div className="mt-8 glass-morphism rounded-xl overflow-hidden shadow-lg animate-fade-in">
            <div className="relative h-48">
              {selectedLocation.imageSrc && (
                <img 
                  src={selectedLocation.imageSrc} 
                  alt={selectedLocation.name} 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-display font-bold">{selectedLocation.name}</h3>
              </div>
            </div>
            <div className="p-4 bg-white">
              <p className="text-love-700">{selectedLocation.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveMap;
