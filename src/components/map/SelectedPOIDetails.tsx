
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Navigation } from "lucide-react";
import { PointOfInterest } from "@/types/poi";
import { toast } from "@/hooks/use-toast";

interface SelectedPOIDetailsProps {
  selectedPOI: PointOfInterest;
  onClose: () => void;
}

const SelectedPOIDetails = ({ selectedPOI, onClose }: SelectedPOIDetailsProps) => {
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
    <Card className="mt-6 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{selectedPOI.name}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
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
  );
};

export default SelectedPOIDetails;
