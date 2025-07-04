
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MapSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MapSearchBar = ({ searchQuery, onSearchChange }: MapSearchBarProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Caută atracții, restaurante, magazine..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default MapSearchBar;
