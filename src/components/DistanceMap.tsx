
import { useState, useEffect } from "react";
import { Map as MapIcon, Route, Navigation, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Coordinate {
  lat: number;
  lng: number;
  label: string;
}

// Map dimensions
const MAP_WIDTH = 800;
const MAP_HEIGHT = 480;

// India's rough bounding box for the map
const INDIA_BOUNDS = {
  north: 37.0902,  // Northern-most latitude
  south: 8.0678,   // Southern-most latitude
  west: 68.0369,   // Western-most longitude
  east: 97.4025    // Eastern-most longitude
};

const DistanceMap = () => {
  // Random initial coordinates - Mumbai and Delhi
  const [coordinates, setCoordinates] = useState<{
    you: Coordinate;
    partner: Coordinate;
  }>({
    you: {
      lat: 19.076,
      lng: 72.8777,
      label: "You", // Mumbai
    },
    partner: {
      lat: 28.6139,
      lng: 77.209,
      label: "Partner", // Delhi
    },
  });

  const [distance, setDistance] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return Math.round(distance);
  };

  useEffect(() => {
    // Calculate distance whenever coordinates change
    const { you, partner } = coordinates;
    const calculatedDistance = calculateDistance(
      you.lat,
      you.lng,
      partner.lat,
      partner.lng
    );
    setDistance(calculatedDistance);
  }, [coordinates]);

  // Convert latitude and longitude to pixel coordinates on the map
  const getPixelCoordinates = (lat: number, lng: number) => {
    const latRange = INDIA_BOUNDS.north - INDIA_BOUNDS.south;
    const lngRange = INDIA_BOUNDS.east - INDIA_BOUNDS.west;
    
    // Calculate the x and y positions proportionally within the map
    const x = ((lng - INDIA_BOUNDS.west) / lngRange) * MAP_WIDTH;
    const y = ((INDIA_BOUNDS.north - lat) / latRange) * MAP_HEIGHT;
    
    return { x, y };
  };

  // Mouse handlers for draggable markers
  const handleMouseDown = (marker: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(marker);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    // Get the map container bounds
    const mapRect = e.currentTarget.getBoundingClientRect();
    
    // Calculate percentage of map width/height
    const xPercent = (e.clientX - mapRect.left) / mapRect.width;
    const yPercent = (e.clientY - mapRect.top) / mapRect.height;
    
    // Convert to lat/lng based on India's bounds
    const lat = INDIA_BOUNDS.north - (yPercent * (INDIA_BOUNDS.north - INDIA_BOUNDS.south));
    const lng = INDIA_BOUNDS.west + (xPercent * (INDIA_BOUNDS.east - INDIA_BOUNDS.west));
    
    // Update coordinates based on which marker is being dragged
    setCoordinates(prev => ({
      ...prev,
      [isDragging]: {
        ...prev[isDragging as keyof typeof prev],
        lat,
        lng
      }
    }));
  };

  const handleMouseUp = () => {
    if (isDragging) {
      toast({
        title: "Location Updated",
        description: `${isDragging === 'you' ? 'Your' : 'Partner\'s'} location has been updated`,
      });
      setIsDragging(null);
    }
  };

  // Get pixel coordinates for both markers
  const youPixels = getPixelCoordinates(coordinates.you.lat, coordinates.you.lng);
  const partnerPixels = getPixelCoordinates(coordinates.partner.lat, coordinates.partner.lng);

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <MapIcon className="mr-2 text-love-600" size={24} />
          Distance Between Us
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          {distance} kilometers apart, but close in heart
        </p>
      </div>

      <div className="relative">
        {/* The map container */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl glass-morphism p-4 shadow-lg">
          <div 
            className="absolute inset-0 m-4 rounded-lg overflow-hidden bg-blue-50"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* The map image */}
            <div className="relative w-full h-full select-none">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/India_relief_location_map.jpg" 
                alt="Map of India" 
                className="w-full h-full object-cover rounded-lg"
                draggable="false"
              />
              
              {/* Line connecting the two points */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={youPixels.x}
                  y1={youPixels.y}
                  x2={partnerPixels.x}
                  y2={partnerPixels.y}
                  stroke="#F43F75"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Markers for locations */}
              <div 
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isDragging === 'you' ? 'z-20' : 'z-10'}`}
                style={{ left: youPixels.x, top: youPixels.y }}
                onMouseDown={handleMouseDown('you')}
              >
                <div className="relative">
                  <MapPin 
                    size={40} 
                    className="text-love-600 drop-shadow-md" 
                    fill="#FEECF3" 
                  />
                  <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-bold">
                    {coordinates.you.label}
                  </span>
                </div>
              </div>

              <div 
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isDragging === 'partner' ? 'z-20' : 'z-10'}`}
                style={{ left: partnerPixels.x, top: partnerPixels.y }}
                onMouseDown={handleMouseDown('partner')}
              >
                <div className="relative">
                  <MapPin 
                    size={40} 
                    className="text-yellow-500 drop-shadow-md" 
                    fill="#FFFBED" 
                  />
                  <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-bold">
                    {coordinates.partner.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Distance indicator */}
          <div className="absolute top-3 right-3 bg-white/80 rounded-lg px-3 py-1 shadow-md flex items-center z-10">
            <Route className="text-love-600 mr-2" size={18} />
            <span className="font-medium text-love-800">{distance} km</span>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-3 left-3 bg-white/80 rounded-lg px-3 py-1 shadow-md text-xs text-love-800 z-10">
            <p>Drag the pins to update locations</p>
          </div>
        </div>
      </div>

      {/* Information card */}
      <div className="mt-8 glass-morphism rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 bg-white">
          <h3 className="font-display text-xl font-bold text-love-800 mb-2 flex items-center">
            <Navigation className="mr-2 text-love-600" size={20} />
            Distance Facts
          </h3>
          <ul className="space-y-2 text-love-700">
            <li>
              • The distance between us is approximately {distance} kilometers
            </li>
            <li>• That's about {Math.round(distance / 1.609)} miles</li>
            <li>
              • A plane would take about {Math.round(distance / 800)} hours to
              travel this distance
            </li>
            <li>
              • Light travels this distance in just{" "}
              {(distance / 299792.458).toFixed(6)} seconds
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DistanceMap;
