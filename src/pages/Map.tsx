import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Map as MapIcon, Navigation, Search, MapPin, Star } from "lucide-react";
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

interface PointOfInterest {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  status: "open" | "closed" | "busy";
  coordinates: { lat: number; lng: number };
}

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  
  const pointsOfInterest: PointOfInterest[] = [
    {
      id: "1",
      name: "Piața Mare Sibiu", 
      category: "Atracție Turistică",
      description: "Centrul istoric al Sibiului, cu arhitectură medievală unică",
      rating: 4.8,
      status: "open",
      coordinates: { lat: 45.7983, lng: 24.1256 }
    },
    {
      id: "2",
      name: "Turnul Sfatului",
      category: "Monument",
      description: "Simbol al Sibiului, turn istoric cu vedere panoramică",
      rating: 4.7,
      status: "open",
      coordinates: { lat: 45.7980, lng: 24.1250 }
    },
    {
      id: "3",
      name: "Restaurant Crama Sibiul Vechi",
      category: "Restaurant",
      description: "Bucătărie românească tradițională în cadru istoric",
      rating: 4.5,
      status: "busy",
      coordinates: { lat: 45.7975, lng: 24.1260 }
    },
    {
      id: "4",
      name: "Podul Minciunilor",
      category: "Atracție Turistică", 
      description: "Cel mai cunoscut pod din Sibiu, cu multe legende",
      rating: 4.3,
      status: "open",
      coordinates: { lat: 45.7970, lng: 24.1248 }
    },
    {
      id: "5",
      name: "Centrul Comercial Promenada",
      category: "Shopping",
      description: "Mall modern cu magazine și restaurante",
      rating: 4.2,
      status: "open",
      coordinates: { lat: 45.8020, lng: 24.1300 }
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-800">Deschis</Badge>;
      case "busy":
        return <Badge className="bg-yellow-100 text-yellow-800">Aglomerat</Badge>;
      case "closed":
        return <Badge className="bg-red-100 text-red-800">Închis</Badge>;
      default:
        return <Badge variant="outline">Necunoscut</Badge>;
    }
  };

  const startNavigation = (poi: PointOfInterest) => {
    toast({
      title: "Navigare pornită!",
      description: `Navigarea către ${poi.name} a început.`,
    });
  };

  const filteredPOIs = pointsOfInterest.filter(poi =>
    poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poi.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <MapIcon className="h-8 w-8 text-orange-600" />
          Harta Sibiului
        </h1>
        <p className="text-gray-600">Explorează orașul cu harta simplă și puncte de interes</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Caută atracții, restaurante, magazine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map with OpenStreetMap */}
        <div className="lg:col-span-2">
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
                  {filteredPOIs.map((poi) => (
                    <Marker
                      key={poi.id}
                      position={[poi.coordinates.lat, poi.coordinates.lng]}
                      eventHandlers={{
                        click: () => setSelectedPOI(poi),
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
        </div>

        {/* Points of Interest List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Puncte de Interes</h2>
          {filteredPOIs.map((poi) => (
            <Card
              key={poi.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedPOI?.id === poi.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPOI(poi)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{poi.name}</CardTitle>
                  {getStatusBadge(poi.status)}
                </div>
                <CardDescription className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {poi.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">{poi.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {poi.rating}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      startNavigation(poi);
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Navighează
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected POI Details */}
      {selectedPOI && (
        <Card className="mt-6 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedPOI.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPOI(null)}
              >
                Închide
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">{selectedPOI.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {selectedPOI.rating} stele
                  </span>
                  {getStatusBadge(selectedPOI.status)}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button onClick={() => startNavigation(selectedPOI)} className="w-full md:w-auto">
                  <Navigation className="h-4 w-4 mr-2" />
                  Pornește Navigarea
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Map;
