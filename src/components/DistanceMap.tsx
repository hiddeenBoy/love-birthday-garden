import { useState, useEffect, useCallback, useRef } from "react";
import { Map as MapIcon, Route, Navigation } from "lucide-react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

interface Coordinate {
  lat: number;
  lng: number;
  label: string;
}

// Center on India
const INDIA_CENTER = {
  lat: 20.5937,
  lng: 78.9629,
};

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

const DistanceMap = () => {
  // Random initial coordinates - you can replace the "You" coordinates later
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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", // This is a public demo key
    id: "google-map-script",
  });

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

  // Function to update your coordinates (will be used later)
  const updateYourCoordinates = (lat: number, lng: number) => {
    setCoordinates((prev) => ({
      ...prev,
      you: {
        ...prev.you,
        lat,
        lng,
      },
    }));
  };

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      setMap(map);

      // Fit bounds to include both markers
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(
        new google.maps.LatLng(coordinates.you.lat, coordinates.you.lng)
      );
      bounds.extend(
        new google.maps.LatLng(coordinates.partner.lat, coordinates.partner.lng)
      );
      map.fitBounds(bounds);
    },
    [coordinates]
  );

  const onMapUnmount = useCallback(() => {
    setMap(null);
    mapRef.current = null;
  }, []);

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
          <div className="absolute inset-0 m-4 rounded-lg overflow-hidden">
            {loadError && (
              <div className="w-full h-full flex items-center justify-center bg-love-100">
                <p className="text-love-800">Error loading maps</p>
              </div>
            )}

            {!isLoaded && (
              <div className="w-full h-full flex items-center justify-center bg-love-100">
                <p className="text-love-800">Loading maps...</p>
              </div>
            )}

            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={INDIA_CENTER}
                zoom={5}
                onLoad={onMapLoad}
                onUnmount={onMapUnmount}
                options={{
                  fullscreenControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  zoomControl: true,
                }}
              >
                {/* Markers for locations */}
                <Marker
                  position={{
                    lat: coordinates.you.lat,
                    lng: coordinates.you.lng,
                  }}
                  label={{ text: "You", color: "#ffffff" }}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: "#F43F75",
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: "#ffffff",
                    scale: 2,
                    anchor: new google.maps.Point(12, 22),
                  }}
                />

                <Marker
                  position={{
                    lat: coordinates.partner.lat,
                    lng: coordinates.partner.lng,
                  }}
                  label={{ text: "Partner", color: "#ffffff" }}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: "#FFD34D",
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: "#ffffff",
                    scale: 2,
                    anchor: new google.maps.Point(12, 22),
                  }}
                />

                {/* Line connecting the two points */}
                <Polyline
                  path={[
                    { lat: coordinates.you.lat, lng: coordinates.you.lng },
                    {
                      lat: coordinates.partner.lat,
                      lng: coordinates.partner.lng,
                    },
                  ]}
                  options={{
                    strokeColor: "#F43F75",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    geodesic: true,
                    icons: [
                      {
                        icon: {
                          path: "M 0,-1 0,1",
                          strokeOpacity: 1,
                          scale: 4,
                        },
                        offset: "0",
                        repeat: "20px",
                      },
                    ],
                  }}
                />
              </GoogleMap>
            )}
          </div>

          {/* Distance indicator */}
          <div className="absolute top-3 right-3 bg-white/80 rounded-lg px-3 py-1 shadow-md flex items-center z-10">
            <Route className="text-love-600 mr-2" size={18} />
            <span className="font-medium text-love-800">{distance} km</span>
          </div>

          {/* Instructions for later */}
          <div className="absolute bottom-3 left-3 bg-white/80 rounded-lg px-3 py-1 shadow-md text-xs text-love-800 z-10">
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
