
import { useState } from "react";
import { Map as MapIcon } from "lucide-react";
import { PointOfInterest } from "@/types/poi";
import { pointsOfInterest } from "@/data/pointsOfInterest";
import InteractiveMap from "@/components/map/InteractiveMap";
import POIList from "@/components/map/POIList";
import SelectedPOIDetails from "@/components/map/SelectedPOIDetails";
import MapSearchBar from "@/components/map/MapSearchBar";

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);

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

      <MapSearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InteractiveMap 
            pointsOfInterest={filteredPOIs}
            onPOISelect={setSelectedPOI}
          />
        </div>

        <POIList 
          pointsOfInterest={filteredPOIs}
          selectedPOI={selectedPOI}
          onPOISelect={setSelectedPOI}
        />
      </div>

      {selectedPOI && (
        <SelectedPOIDetails 
          selectedPOI={selectedPOI}
          onClose={() => setSelectedPOI(null)}
        />
      )}
    </div>
  );
};

export default Map;
