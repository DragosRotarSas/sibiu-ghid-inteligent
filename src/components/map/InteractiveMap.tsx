
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { Star, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PointOfInterest } from "@/types/poi";
import { toast } from "@/hooks/use-toast";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  pointsOfInterest: PointOfInterest[];
  onPOISelect: (poi: PointOfInterest) => void;
}

const InteractiveMap = ({ pointsOfInterest, onPOISelect }: InteractiveMapProps) => {
  const startNavigation = (poi: PointOfInterest) => {
    toast({
      title: "Navigare pornită!",
      description: `Navigarea către ${poi.name} a început.`,
    });
  };

  return (
    <Card className="h-[500px]">
      <CardContent className="p-0 h-full">
        <div className="h-full rounded-lg overflow-hidden">
          <MapContainer
            center={[45.7983, 24.1256]}
            zoom={15}
            className="h-full w-full"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pointsOfInterest.map((poi) => (
              <Marker
                key={poi.id}
                position={[poi.coordinates.lat, poi.coordinates.lng]}
                eventHandlers={{
                  click: () => onPOISelect(poi),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">{poi.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{poi.category}</p>
                    <div className="flex items-center text-xs mb-2">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      {poi.rating}
                    </div>
                    <Button
                      size="sm"
                      className="text-xs h-6"
                      onClick={() => startNavigation(poi)}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Navighează
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
