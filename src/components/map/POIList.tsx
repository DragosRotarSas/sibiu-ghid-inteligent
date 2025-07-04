
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Navigation } from "lucide-react";
import { PointOfInterest } from "@/types/poi";
import { toast } from "@/hooks/use-toast";

interface POIListProps {
  pointsOfInterest: PointOfInterest[];
  selectedPOI: PointOfInterest | null;
  onPOISelect: (poi: PointOfInterest) => void;
}

const POIList = ({ pointsOfInterest, selectedPOI, onPOISelect }: POIListProps) => {
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Puncte de Interes</h2>
      {pointsOfInterest.map((poi) => (
        <Card
          key={poi.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedPOI?.id === poi.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onPOISelect(poi)}
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
  );
};

export default POIList;
