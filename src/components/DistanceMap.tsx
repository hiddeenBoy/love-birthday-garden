
import { useState, useEffect } from "react";
import { Route, Navigation, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Coordinate {
  lat: number;
  lng: number;
  label: string;
}

// SVG viewBox dimensions
const SVG_WIDTH = 450;
const SVG_HEIGHT = 400;

const DistanceMap = () => {
  // Fixed coordinates - West Bengal and Tamil Nadu
  const [coordinates] = useState<{
    you: Coordinate;
    partner: Coordinate;
  }>({
    you: {
      lat: 22.9868,
      lng: 87.855,
      label: "You", // West Bengal
    },
    partner: {
      lat: 11.1271,
      lng: 78.6569,
      label: "Partner", // Tamil Nadu
    },
  });

  const [distance, setDistance] = useState<number>(0);

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

  // Convert geographic coordinates to SVG coordinates
  // These are approximate conversions for India's geography to fit in our SVG
  const geoToSvgCoordinates = (lat: number, lng: number) => {
    // India's approximate bounds
    const minLat = 8; // Southern tip
    const maxLat = 37; // Northern tip
    const minLng = 68; // Western edge
    const maxLng = 97; // Eastern edge
    
    // Convert to percentage of India's bounds
    const x = ((lng - minLng) / (maxLng - minLng)) * SVG_WIDTH;
    // Flip y-axis (SVG 0,0 is top-left)
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * SVG_HEIGHT;
    
    return { x, y };
  };

  useEffect(() => {
    // Calculate distance when component mounts
    const { you, partner } = coordinates;
    const calculatedDistance = calculateDistance(
      you.lat,
      you.lng,
      partner.lat,
      partner.lng
    );
    setDistance(calculatedDistance);
  }, [coordinates]);

  // Show distance info modal
  const showDistanceInfo = () => {
    toast({
      title: "Distance Information",
      description: `The distance between ${coordinates.you.label} (West Bengal) and ${coordinates.partner.label} (Tamil Nadu) is ${distance} kilometers.`,
    });
  };

  // Get SVG coordinates for both locations
  const youSvgCoords = geoToSvgCoordinates(
    coordinates.you.lat,
    coordinates.you.lng
  );
  
  const partnerSvgCoords = geoToSvgCoordinates(
    coordinates.partner.lat,
    coordinates.partner.lng
  );

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Route className="mr-2 text-love-600" size={24} />
          Distance Between Us
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          {distance} kilometers apart, but close in heart
        </p>
      </div>

      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-center text-love-800">
            <Navigation className="inline mr-2 text-love-600" size={20} />
            Our Locations on India Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] bg-love-50 rounded-lg overflow-hidden">
            {/* SVG Map of India */}
            <svg 
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} 
              className="w-full h-full"
            >
              {/* Simplified outline of India */}
              <path 
                d="M100,50 L150,30 L200,40 L250,30 L280,50 L300,100 L350,130 L340,180 L300,220 L320,260 L300,290 L260,310 L240,350 L200,370 L160,350 L120,300 L100,250 L80,220 L60,180 L70,130 L90,100 L100,50"
                fill="#E5DEFF"
                stroke="#9b87f5"
                strokeWidth="2"
                className="opacity-70"
              />
              
              {/* Connection line between points */}
              <line 
                x1={youSvgCoords.x} 
                y1={youSvgCoords.y} 
                x2={partnerSvgCoords.x} 
                y2={partnerSvgCoords.y} 
                stroke="#F43F75" 
                strokeWidth="3" 
                strokeDasharray="5,5" 
              />
              
              {/* Distance label */}
              <text 
                x={(youSvgCoords.x + partnerSvgCoords.x) / 2} 
                y={(youSvgCoords.y + partnerSvgCoords.y) / 2 - 10} 
                fill="#1A1F2C" 
                fontSize="12" 
                fontWeight="bold" 
                textAnchor="middle"
              >
                {distance} km
              </text>
              
              {/* West Bengal marker (You) */}
              <circle 
                cx={youSvgCoords.x} 
                cy={youSvgCoords.y} 
                r="6" 
                fill="#F43F75" 
                stroke="white" 
                strokeWidth="2"
              />
              <text 
                x={youSvgCoords.x} 
                y={youSvgCoords.y + 20} 
                fill="#1A1F2C" 
                fontSize="10" 
                fontWeight="bold" 
                textAnchor="middle"
              >
                West Bengal
              </text>
              
              {/* Tamil Nadu marker (Partner) */}
              <circle 
                cx={partnerSvgCoords.x} 
                cy={partnerSvgCoords.y} 
                r="6" 
                fill="#FFBD59" 
                stroke="white" 
                strokeWidth="2"
              />
              <text 
                x={partnerSvgCoords.x} 
                y={partnerSvgCoords.y + 20} 
                fill="#1A1F2C" 
                fontSize="10" 
                fontWeight="bold" 
                textAnchor="middle"
              >
                Tamil Nadu
              </text>
            </svg>
            
            {/* City labels overlay */}
            <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded shadow-sm flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-love-600 mr-1.5"></div>
                <span className="text-xs font-medium">West Bengal ({coordinates.you.label})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                <span className="text-xs font-medium">Tamil Nadu ({coordinates.partner.label})</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button 
            variant="outline" 
            onClick={showDistanceInfo}
            className="bg-love-50 text-love-700 hover:bg-love-100 border-love-200"
          >
            <Route className="mr-2" size={16} />
            Show Distance Details
          </Button>
        </CardFooter>
      </Card>

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
