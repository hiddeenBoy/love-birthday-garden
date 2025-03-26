
import { useState, useEffect } from 'react';
import { Map, Route, Navigation, MapPin } from 'lucide-react';

interface Coordinate {
  lat: number;
  lng: number;
  label: string;
}

const DistanceMap = () => {
  // Random initial coordinates - you can replace the "You" coordinates later
  const [coordinates, setCoordinates] = useState<{
    you: Coordinate;
    partner: Coordinate;
  }>({
    you: {
      lat: 37.7749,
      lng: -122.4194,
      label: "You"
    },
    partner: {
      lat: 40.7128,
      lng: -74.0060,
      label: "Partner"
    }
  });

  const [distance, setDistance] = useState<number>(0);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return Math.round(distance);
  };

  useEffect(() => {
    // Calculate distance whenever coordinates change
    const { you, partner } = coordinates;
    const calculatedDistance = calculateDistance(
      you.lat, you.lng,
      partner.lat, partner.lng
    );
    setDistance(calculatedDistance);
  }, [coordinates]);

  // Function to update your coordinates (will be used later)
  const updateYourCoordinates = (lat: number, lng: number) => {
    setCoordinates(prev => ({
      ...prev,
      you: {
        ...prev.you,
        lat,
        lng
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Map className="mr-2 text-love-600" size={24} />
          Distance Between Us
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          {distance} kilometers apart, but close in heart
        </p>
      </div>

      <div className="relative">
        {/* The map background */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl glass-morphism p-4 shadow-lg">
          <div className="absolute inset-0 m-4 rounded-lg bg-love-100/50 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/351264/pexels-photo-351264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="World map" 
              className="w-full h-full object-cover opacity-30"
            />
            
            {/* The connecting line between points */}
            <svg className="absolute inset-0 w-full h-full">
              <line 
                x1={`${(coordinates.you.lng + 180) / 360 * 100}%`} 
                y1={`${(90 - coordinates.you.lat) / 180 * 100}%`}
                x2={`${(coordinates.partner.lng + 180) / 360 * 100}%`}
                y2={`${(90 - coordinates.partner.lat) / 180 * 100}%`}
                stroke="#F43F75"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>
          </div>
          
          {/* Location markers */}
          {Object.entries(coordinates).map(([key, location]) => (
            <div 
              key={key}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ 
                left: `${((location.lng + 180) / 360) * 100}%`, 
                top: `${((90 - location.lat) / 180) * 100}%` 
              }}
            >
              <div className="relative group">
                <MapPin 
                  size={36} 
                  className={`${key === 'you' ? 'text-love-600' : 'text-gold-600'} filter drop-shadow-md`} 
                  fill={key === 'you' ? "#F43F75" : "#FFD34D"}
                />
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping" />
                
                {/* Label tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-md text-sm text-love-800 pointer-events-none">
                  {location.label}
                  <br />
                  {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Distance indicator */}
          <div className="absolute top-3 right-3 bg-white/80 rounded-lg px-3 py-1 shadow-md flex items-center">
            <Route className="text-love-600 mr-2" size={18} />
            <span className="font-medium text-love-800">{distance} km</span>
          </div>
          
          {/* Instructions for later */}
          <div className="absolute bottom-3 left-3 bg-white/80 rounded-lg px-3 py-1 shadow-md text-xs text-love-800">
            <p>You can update your coordinates later</p>
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
            <li>• The distance between us is approximately {distance} kilometers</li>
            <li>• That's about {Math.round(distance / 1.609)} miles</li>
            <li>• A plane would take about {Math.round(distance / 800)} hours to travel this distance</li>
            <li>• Light travels this distance in just {(distance / 299792.458).toFixed(6)} seconds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DistanceMap;
