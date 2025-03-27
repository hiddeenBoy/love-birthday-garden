
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

// Canvas dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const DistanceMap = () => {
  // Fixed coordinates - Mumbai and Delhi
  const [coordinates] = useState<{
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
      description: `The distance between ${coordinates.you.label} and ${coordinates.partner.label} is ${distance} kilometers.`,
    });
  };

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
            Our Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simple distance visualization */}
          <div className="relative w-full h-[300px] bg-love-50 rounded-lg overflow-hidden">
            {/* Fixed locations and connecting line */}
            <div className="absolute inset-0 flex items-center justify-between px-16">
              {/* You location */}
              <div className="flex flex-col items-center">
                <div className="mb-2 font-medium text-love-700">
                  {coordinates.you.label}
                </div>
                <div className="bg-white p-2 rounded-full shadow-md">
                  <MapPin size={32} className="text-love-600" fill="#FEECF3" />
                </div>
                <div className="mt-2 text-xs text-love-600">
                  {coordinates.you.lat.toFixed(4)}, {coordinates.you.lng.toFixed(4)}
                </div>
              </div>

              {/* Distance line */}
              <div className="flex-1 mx-4 relative">
                <div className="h-1 bg-love-300 w-full"></div>
                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow text-love-700 font-bold flex items-center">
                  <Route size={16} className="mr-1 text-love-500" />
                  {distance} km
                </div>
              </div>

              {/* Partner location */}
              <div className="flex flex-col items-center">
                <div className="mb-2 font-medium text-love-700">
                  {coordinates.partner.label}
                </div>
                <div className="bg-white p-2 rounded-full shadow-md">
                  <MapPin size={32} className="text-yellow-500" fill="#FFFBED" />
                </div>
                <div className="mt-2 text-xs text-love-600">
                  {coordinates.partner.lat.toFixed(4)}, {coordinates.partner.lng.toFixed(4)}
                </div>
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
